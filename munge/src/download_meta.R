library(RCurl)
library(magrittr)
library(parallel)

dir.create("data/meta/")

path <-
  "ftp://ftp.ncdc.noaa.gov/pub/data/metadata/published/paleo/dc/xml/"

getURL(path, dirlistonly = TRUE) %>%
  strsplit("\n") %>% .[[1]] -> files

tree_files <- files[grep("noaa-tree", files)]

n_cores <- detectCores() - 1
cl <- makeCluster(getOption("cl.cores", n_cores), type="FORK")

parLapply(cl, tree_files, function(x) {
  download.file(url = paste0(path, x),
                destfile = paste0("data/meta/", x))
})

stopCluster(cl)

# note: this is very slow and may stall. Using an FTP-client might be better...