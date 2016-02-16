library(dplyr)

clim_files <- list.files("data/climate_raw", pattern = "*\\.csv")
clim_stat_files <- tolower(clim_files)

n <- length(clim_files)

for (i in 1:n) {

    cat(i, "\n")

    clim_path <- paste0("data/climate_raw/", clim_files[i])
    clim <- read.csv(clim_path)[,-1]

    clim_np <- clim %>% filter(year %in% 1971:2000)

    if (!(any(is.na(clim_np)))) {
    
        clim_np %>% 
            group_by(month) %>%
            summarise(tmp = mean(tmp, na.rm = TRUE),
                      pre = sum(pre)/30) -> clim_np
        
        out <- data.frame(
            month = c("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                      "Aug", "Sep", "Oct", "Nov", "Dec"),
            temp = round(clim_np$tmp, 2),
            prec = round(clim_np$pre, 2)
        )
        
        Fname <- paste0("data/clim/", clim_stat_files[i])
        write.table(out, file = Fname, quote = FALSE, sep = ",",
                    dec = ".", row.names = FALSE)

    }
    
}
