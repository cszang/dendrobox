library(XML)
library(stringr)
library(magrittr)
library(dplyr)

xmls <- list.files("data/meta", pattern = "*\\.xml")
## exclude general description of repo
xmls <- xmls[-which(xmls == "noaa-tree-13831.xml")] 

n <- length(xmls)

id <- investigator <- location <- species_short <- species_long <-
  species_english <- url <- citation <- character(n)
lat <- lon <- numeric(n)

id_regex <- "[A-Z]{2,5}[0-9]{3,4}"
species_regex1 <- "\\s[A-Z]{4}\\s"
species_regex2 <- "^[A-Z]{4}$"

for (i in 1:n) {
  cat(i, "::")
  path <- xmls[i]
  path <- paste0("data/meta/", path)
  xml <- xmlToList(path, addAttributes = TRUE)
  title <- xml$Description$title
  title_s <- str_split(title, "-") %>% lapply(str_trim) %>% unlist()
  ## we check for tree-ring-width related title information
  this_id <- str_match(title, id_regex) %>% as.vector()
  if (!is.na(this_id)) {
    id[i] <- this_id
    coords <- xml$Description$WGS84BoundingBox$LowerCorner
    coords_s <- strsplit(coords, "\\s")[[1]]
    lon[i] <- as.numeric(coords_s[1])
    lat[i] <- as.numeric(coords_s[3])
    species_short[i] <- str_trim(str_match(title, species_regex1))
    this_investigator <- xml$Description$creator
    investigator[i] <- this_investigator
    ## find out which part of the title has the location
    which_id <- which(!is.na(str_match(title_s, id_regex)))
    which_species <- which(!is.na(str_match(title_s, species_regex2)))
    first_investigator <- str_extract(this_investigator, "^\\w*")
    which_researcher <- which(!is.na(str_match(title_s,
                                              first_investigator)))
    if (length(which_researcher) == 0) {
      which_researcher <- which(!is.na(
        str_match(title_s, toupper(first_investigator))))
    }
    if (length(which_researcher) == 0) {
      second_investigator <- str_split(this_investigator, ";") %>%
        lapply(str_trim) %>% unlist() %>% .[2] %>% str_extract("^\\w*")
      which_researcher <- which(!is.na(str_match(title_s,
                                                second_investigator)))
    }
    if (length(which_researcher) > 1) {
      which_researcher <- which_researcher[1]
    }
    ## location is next to researcher, so clean which_species if
    ## needed
    if (length(which_species) > 1) {
      which_species <- which_species[-which.min(which_species - which_researcher)]
    }
    
    not_location <- c(which_id, which_species, which_researcher)
    this_location <- title_s[-not_location]
    cat(this_id, "%", length(this_location), "?", this_location, ">>", species_short[i], "\n")
    location[i] <- this_location
    url[i] <- xml$Description$relation
  } else {
    cat("(skipped)\n")
  }
}

d <- data.frame(id, investigator, location, species_short,
               lon, lat, url, stringsAsFactors = FALSE)

d <- na.omit(d) %>% tbl_df() %>% filter(id != "")

## clean up investigators

inv_splitter <- function(x, index) {
  split <- str_split(x, ";")
  sapply(split, "[", index)
}

d$investigator1 <- inv_splitter(d$investigator, 1)
d$investigator2 <- inv_splitter(d$investigator, 2)
d$investigator3 <- inv_splitter(d$investigator, 3)

species_list <- read.fwf("data/species_codes_clean.txt",
                        c(6, 46),
                        stringsAsFactors = FALSE)

names(species_list) <- c("species_short", "species_latin")

species_list %>% mutate(
  species_short = sapply(species_short, str_trim) %>% as.vector(),
  species_latin = sapply(species_latin, str_trim) %>% as.vector()
) -> species_list

meta <- merge(d, species_list, by = "species_short") %>% tbl_df()

## add "sp." when only genus is present
genus_only <- which(sapply(str_split(meta$species_latin, "\\s"),
                          length) == 1)

meta$species_latin[genus_only] <- paste(meta$species_latin[genus_only],
                                       "sp.")

