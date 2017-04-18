munge:
	R CMD BATCH munge/write_chronos.R
	R CMD BATCH munge/write_climatology.R
	R CMD BATCH munge/write_cgr.R
	R CMD BATCH munge/write_meta.R
	R CMD BATCH munge/write_html.R
