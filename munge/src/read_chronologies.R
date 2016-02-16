## read in all chronologies, create log for those that fail

library(dplR)
library(stringr)

chronos <- list.files("data/itrdb/chronos/",
                     pattern = "[A-Za-z]{2,4}[0-9]{2,3}\\.crn")

n <- length(chronos)
j <- 0

crns <- list()
error_log_crn <- NULL

for (i in 1:n) {
  path <- paste0("data/itrdb/chronos/", chronos[i])
  crn <- try(read.crn(path))
  id <- str_extract(chronos[i], "[A-Za-z]*[0-9]*") %>% toupper()
  if (inherits(crn, "try-error")) {
    error_log_crn <- c(error_log_crn, id)
  } else {
    j <- j + 1
    crns[[j]] <- crn
    names(crns)[j] <- id
  }
}

## save for ITRDB maintainers
writeLines(error_log_crn, con = "error_crn.log")

## read in and process raw measurements for failed chronos

## these do not work and errors while attempting to read in are
## handled well with try*
not_working <- c(
  "AK007"
)

error_working <- error_log_crn[!(error_log_crn %in% not_working)]

meas <- paste0("data/itrdb/measure/", tolower(error_working), ".rwl")
m <- length(meas)

error_log_rwl <- NULL

for (i in 1:m) {
  path <- meas[i]
  if (file.exists(path)) {
    rwl <- try(read.tucson(path))
    id <- error_log_crn[i]
    if (inherits(rwl, "try-error")) {
      error_log_rwl <- c(error_log_rwl, id)
    } else {
      j <- j + 1
      crn <- rwl %>%
        detrend(method = "Spline") %>%
        chron()
      crns[[j]] <- crn
      names(crns)[j] <- id
    }
  }
}

# now, there are also sites that are only present in the raw measurements, but
# not in the chronologies; we want these, too!

all_meas <- list.files("data/itrdb/measure/") %>% 
  str_extract("[a-z]{2,4}[0-9]{2,3}\\.rwl") %>% 
  na.omit() %>% 
  str_extract("[a-z]{2,4}[0-9]{2,3}")

all_chronos <- chronos %>% 
  str_extract("[a-z]{2,4}[0-9]{2,3}")

add_ids <- all_meas[!(all_meas %in% all_chronos)] %>% 
  str_to_upper()
  
add_meas <- all_meas[!(all_meas %in% all_chronos)] %>% 
  paste0("data/itrdb/measure/", ., ".rwl")

o <- length(add_meas)

for (i in 1:o) {
  path <- add_meas[i]
  if (file.exists(path)) {
    rwl <- try(read.tucson(path))
    id <- add_ids[i]
    if (inherits(rwl, "try-error")) {
      error_log_rwl <- c(error_log_rwl, id)
    } else {
      j <- j + 1
      crn <- rwl %>%
        detrend(method = "Spline") %>%
        chron()
      crns[[j]] <- crn
      names(crns)[j] <- id
    }
  }
}

## save for ITRDB maintainers
writeLines(error_log_rwl, con = "error_rwl.log")