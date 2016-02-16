meta <- read.csv("data/itrdb_clean.csv", stringsAsFactors = FALSE)
spec_all <- read.table("data/species_codes_clean.txt", sep = "\t")
spec_codes <- sapply(spec_all, function(x) substr(x, 1, 4))
spec_full <- sapply(spec_all, function(x) substr(x, 7, 100))

species_u <- unique(meta$species)
spec_codes_sub <- spec_codes[spec_codes %in% species_u]
spec_full_sub <- spec_full[spec_codes %in% species_u]

inv <- sapply(meta$investigator, function(x) strsplit(x, ";")[[1]][1])
authors_u <- sort(unique(inv))

## apply first author filter to meta data
meta$all_investigators <- meta$investigator
meta$investigator <- inv

## filter meta entries: only entries where we have a chrono
crns <- list.files("data/tree", pattern = "*\\.csv")
crns <- toupper(gsub(".csv", "", crns))

available_crns <- meta$code %in% crns

all(available_crns)                     # TRUE

## overwrite meta data file
write.table(meta, file = "data/itrdb_clean.csv", sep = ",",
            dec = ".", row.names = FALSE)

## export author and species lists for index.html
write.table(authors_u, file = "data/authors.txt", quote = FALSE,
            row.names = FALSE, col.names = FALSE)

write.table(data.frame(spec_codes_sub, spec_full_sub),
            file = "data/species.txt", quote = FALSE,
            row.names = FALSE, col.names = FALSE)

## ...now for the dirty secret: you could probably use some fancy
## awd/sed combo to transform this into the needed option/value pairs,
## but... --- I am using an Emacs macro ;-) see the macros.el file

## then: copy formatted lists over to index.html. Again, there might
## be a more elegant way to achieve this, but...
