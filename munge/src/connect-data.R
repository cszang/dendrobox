## check agreement between metadata and chronos

## question: are all crns covered with meta data?
missing <- names(crns)[!(names(crns) %in% meta$id)]

## nope: we will have to sort these out!
lapply(missing,
       function(x) {
         eval(substitute(
           crns$NAME <<- NULL,            # global assignment needed!
           list(NAME = x)
         ))
       })

## now vv
missing <- meta$id[!(meta$id %in% names(crns))]
meta <- meta %>% filter(!(id %in% missing))

## how about non-unique ids?
table(meta$id)[which(table(meta$id) > 1)]
## sometimes double ids; we take the first one in each case
meta %>% distinct(id) -> meta

# export chronos to single files (csv)
n <- length(crns)
for (i in 1:n) {
    F <- data.frame(year = as.numeric(rownames(crns[[i]])),
                                rwi = round(crns[[i]][,1], 3))
    Fname <- paste0("data/tree/", tolower(names(crns)[i]), ".csv")
    cat(Fname, "\n")
    write.table(F, file = Fname, quote = FALSE, sep = ",", dec = ".", col.names = TRUE, row.names = FALSE)
}

# export meta in needed format
meta_clean <- data.frame(
    code = meta$id,
    studysite = meta$location,
    species = meta$species_short,
    investigator = meta$investigator,
    lon = meta$lon,
    lat = meta$lat,
    url = meta$url)
    
write.table(meta_clean, "data/itrdb_clean.csv", sep = ",", row.names = FALSE)