library(itrdb)
library(tidyverse)
library(stringr)

split_inv <- function(x) {
  if (any(is.na(str_match(x, ";")))) {
    x
  } else {
    str_split(x, ";")[[1]][1]
  }
}

clean_meta <- itrdb_meta %>%
  mutate(
    code = site_code,
    studysite = site_name,
    all_investigators = investigators,
    url = itrdb_url,
    species = species_code,
    investigator = sapply(investigators, split_inv)
  ) %>%
  select(
    code,
    studysite,
    species,
    species_scientific_name,
    species_common_name,
    investigator,
    lon,
    lat,
    url,
    all_investigators
  )

## filter data for available chronos
chronos <- list.files("data/tree", pattern = ".*\\.csv")
chronos <- chronos %>% gsub("\\.csv$", "", .) %>% toupper

clean_meta <- clean_meta %>% filter(code %in% chronos)

write.table(clean_meta, file = "data/itrdb_clean.csv", quote = TRUE,
            sep = ",", dec = ".", row.names = FALSE)
