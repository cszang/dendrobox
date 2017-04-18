library(itrdbclim)
library(tidyverse)

sites <- unique(itrdb_worldclim$site_code)
n <- length(sites)
for (i in 1:n) {
  .site_code <- sites[i]
  .site <- itrdb_worldclim %>% filter(site_code == .site_code)
  .site$month <- month.abb
  .site <- .site %>%
    select(month, temp = tmp, prec = pre)
  write.table(.site, file = paste0("data/clim/", .site_code, ".csv"),
              sep = ",", dec = ".", row.names = FALSE, quote = FALSE)
}
