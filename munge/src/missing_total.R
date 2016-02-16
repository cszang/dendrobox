missing_rwl <- read.table("error_rwl.log", stringsAsFactors = FALSE)
missing_crn <- read.table("error_crn.log", stringsAsFactors = FALSE)

really_missing_rwl <- sum(!(missing_rwl[,1] %in% missing_crn[,1]))
really_missing_crn <- sum(!(missing_crn[,1] %in% missing_rwl[,1]))

really_missing_rwl + really_missing_crn
