# get treering data from NOAA archives; we work with the zip-files
# for now (even though the individual folders might be more up-to-date)

countries <- c("africa", "asia", "australia", "canada", "europe",
              "mexico", "southamerica", "usa")
              
dir.create("data/itrdb/chronos", recursive = TRUE)
dir.create("data/itrdb/measure")

# chronologies

zips <-
  paste0("ftp://ftp.ncdc.noaa.gov/pub/data/paleo/treering/chronologies/itrdb-v705-",
         countries,
         "-crn.zip"
         )

local_fn <-
  paste0("data/itrdb/chronos/", countries, ".zip")

mapply(function(x, y) download.file(url = x, destfile = y),
       zips, local_fn)

lapply(local_fn, function(x) unzip(x, exdir = "data/itrdb/chronos"))

## get raw measurements

zips <-
  paste0("ftp://ftp.ncdc.noaa.gov/pub/data/paleo/treering/measurements/itrdb-v705-",
         countries,
         "-rwl.zip"
         )

local_fn <-
  paste0("data/itrdb/measure/", countries, ".zip")

mapply(function(x, y) download.file(url = x, destfile = y),
       zips, local_fn)

lapply(local_fn, function(x) unzip(x, exdir = "data/itrdb/measure"))
