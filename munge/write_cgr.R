library(itrdb)
library(itrdbclim)
library(treeclim)
library(tidyverse)

set.seed(42)

sites <- unique(itrdb_tidy$site_code)
n <- length(sites)

for (i in 1:n) {
  cat("site", i, "\n")
  .site_code <- sites[i]
  tree <- itrdb_tidy %>% filter(site_code == .site_code)
  treedf <- data.frame(rwi = tree$rwi)
  rownames(treedf) <- tree$year
  clim <- itrdb_climate_cru %>% filter(site_code == .site_code) %>%
    select(year, month, tmp, pre)
  .dcc <- tryCatch(
    dcc(treedf, clim)$coef,
    error = function(e) e
  )
  if (!any(class(.dcc) == "error")) {
    dccdf <- data.frame(
      month = .dcc$month[1:16],
      prec = round(.dcc$coef[1:16], 2),
      temp = round(.dcc$coef[17:32], 2),
      precs = .dcc$significant[1:16],
      temps = .dcc$significant[17:32]
    )
    write.table(dccdf,
                file = paste0("data/resp/", .site_code, ".csv"),
                sep = ",", dec = ".", quote = FALSE,
                row.names = FALSE)
  }
}
