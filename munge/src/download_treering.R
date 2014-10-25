## download treering data from ITRDB's ftp servers

version <- "v705"                       # data version on FTP server

base_path_crn <-
  "ftp://ftp.ncdc.noaa.gov/pub/data/paleo/treering/chronologies/"
base_path_rwl <-
  "ftp://ftp.ncdc.noaa.gov/pub/data/paleo/treering/measurements/"

continents <- c("africa",
                "asia",
                "australia",
                "canada",
                "europe",
                "mexico",
                "southamerica",
                "usa")

zip_files_crn <- paste("itrdb", version, continents,
                       "crn.zip", sep = "-")
zip_files_rwl <- paste("itrdb", version, continents,
                       "rwl.zip", sep = "-")

dir.create("data/crn")
dir.create("data/rwl")

n <- length(continents)

for (i in 1:n) {
  download.file(paste(base_path_crn, zip_files_crn[i], sep = ""),
                file.path("data", "crn", zip_files_crn[i]))
  unzip(file.path("data", "crn", zip_files_crn[i]), exdir = "data/crn")
  download.file(paste(base_path_rwl, zip_files_rwl[i], sep = ""),
                file.path("data", "rwl", zip_files_rwl[i]))
  unzip(file.path("data", "rwl", zip_files_rwl[i]), exdir = "data/rwl")
}
