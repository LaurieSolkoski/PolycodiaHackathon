# sp and maptools packages
library(sp)
library(maptools)

coords <- read.csv("empty.csv")

coords$timestamp <- as.POSIXct(coords$timestamp, tz = "UTC")  

# defining idle time function
calculate_idle_time <- function(coord1, coord2) {
  elapsed_time <- coord2$timestamp - coord1$timestamp  
  
  # calc elapsed time between coordinates
  return(elapsed_time)
}

# calc the total idle time
idle_time <- 0  # Initialize idle time
for (i in 2:nrow(coords)) {
  idle_time <- idle_time + calculate_idle_time(coords[i - 1, ], coords[i, ])
}

print(idle_time) 
