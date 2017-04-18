library(tidyverse)
library(stringr)

wrap_option <- function(x, y = x) {
  paste0(
    "<option value='",
    x,
    "'>",
    y,
    "</option>"
  )
}

itrdb_meta <- read_csv("data/itrdb_clean.csv")

investigators <- sort(unique(itrdb_meta$investigator))
inv_options <- wrap_option(investigators)

itrdb_meta %>% select(species_scientific_name, species) %>%
  mutate(species_scientific_name = str_extract(species_scientific_name, "[A-Z][a-z]+\\s[a-z\\.]+")) %>% 
  arrange(species_scientific_name) %>%
  distinct() -> species_clean

spec_options <- wrap_option(species_clean$species, species_clean$species_scientific_name)

top <- readLines("top.part")
middle <- readLines("middle.part")
bottom <- readLines("bottom.part")
cat(top, spec_options, middle, inv_options, bottom,
    file = "index.html", sep = "\n")
