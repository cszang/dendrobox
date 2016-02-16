library(tusk)
library(ncdf4)

create.dir("data/climate_raw")

# ! this requires locally present CRU TS 3.22 and Worldclim data

cru_tmp <- nc_open("~/LocalData/CRU_TS_3_22/cru_ts3.22.1901.2013.tmp.dat.nc")
cru_pre <- nc_open("~/LocalData/CRU_TS_3_22/cru_ts3.22.1901.2013.pre.dat.nc")
wc_tmp <- "~/LocalData/Worldclim/Tmean"
wc_pre <- "~/LocalData/Worldclim/Precipitation"

n <- nrow(meta)

error_log_climate <- NULL

for (i in 1:n) {
  cat("starting coord pair", i, "of", n, "\n")
  .meta <- meta[i,]
  .id <- .meta$id
  .lon <- .meta$lon
  .lat <- .meta$lat
  coord <- list(lon = .lon, lat = .lat)
  
  nearest <- nearest_points(coord, cru_tmp,
                            data = "ts322", npoints = 4)
  
  int_tmp <- try(interp_down(cru_tmp, wc_tmp, param = "tmp",
                         coords = coord, nearest = nearest,
                         data_set = "ts322", downscale = TRUE))
  int_pre <- try(interp_down(cru_pre, wc_pre, param = "pre",
                         coords = coord, nearest = nearest,
                         data_set = "ts322", downscale = TRUE))
  
  if (inherits(int_tmp, "try-error")) {
    error_log_climate <- c(error_log_climate, .id)
    next 
  }
  
  .out <- data.frame(id = .id,
                     year = int_tmp$year,
                     month = int_tmp$month,
                     tmp = int_tmp$extract,
                     pre = int_pre$extract)
  Fname <- paste0("data/climate_raw/", .id, ".csv") 
  cat(Fname, "\n")
  write.table(.out, file = Fname, quote = FALSE, row.names = FALSE, sep = ",", dec = ".")                  
}

## save error log
writeLines(error_log_climate, con = "error_climate.log")
