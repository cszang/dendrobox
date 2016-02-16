library(treeclim)

dir.create("data/resp")

# format of output csv: month (str), prec, temp, sig_prec (bool), sig_temp (bool)

crn_files <- list.files("data/tree", pattern = "*\\.csv")
n <- length(crn_files)

clim_files <- list.files("data/climate_raw", pattern = "\\.csv")
clim_keys <- tolower(gsub(".csv", "", clim_files))

for (i in 1:n) {

    cat(i, "\n")

    crn_file <- crn_files[i]
    crn_path <- paste0("data/tree/", crn_file)
    crn_key <- gsub(".csv", "", crn_file)
    
    matching_clim <- which(clim_keys == crn_key)
    
    if (length(matching_clim ==1)) {
    
        clim_path <- paste0("data/climate_raw/", clim_files[matching_clim])
        clim <- read.csv(clim_path)[,-1]
        crn <- read.csv(crn_path, row.names = 1)
        crn_years <- as.numeric(rownames(crn))
        
        overlap <- crn_years[crn_years %in% clim$year]
        clim_sub <- clim[clim$year %in% overlap,]

        if (length(overlap) > 31 & !any(is.na(clim_sub))) {
        
            dc <- try(dcc(crn, clim))

            if (!any(class(dc) == "try-error")) {
            
                out <- data.frame(
                    
                    month = c("jun", "jul", "aug", "sep", "oct", "nov",
                              "dec", "JAN", "FEB", "MAR", "APR", "MAY",
                              "JUN", "JUL", "AUG", "SEP"),
                    prec = coef(dc)[coef(dc)$varname == "pre",]$coef,
                    temp = coef(dc)[coef(dc)$varname == "tmp",]$coef,
                    precs = coef(dc)[coef(dc)$varname == "pre",]$significant,
                    temps = coef(dc)[coef(dc)$varname == "tmp",]$significant
                )
                        
                Fresp <- paste0("data/resp/", crn_file)
            
                write.table(out, file = Fresp, quote = FALSE,
                            row.names = FALSE, sep = ",", dec = ".")
            }
        }
    }
}
