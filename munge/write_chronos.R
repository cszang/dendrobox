library(itrdb)
library(tidyverse)

sites <- itrdb_meta$site_code
n <- length(sites)

wfunc <- function(x, site) {
  x <- x[, 2:3]
  x[,2] <- round(x[,2], 3)
  fpath <- paste0("data/tree/", site, ".csv")
  write.table(x, file = fpath, quote = FALSE, sep = ",",
              dec = ".", row.names = FALSE)
}

for (i in 1:n) {
  .site_code <- sites[i]
  .site <- filter(itrdb_tidy, site_code == .site_code)
  wfunc(.site, .site_code)
}
