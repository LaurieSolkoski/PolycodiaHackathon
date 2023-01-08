coords <- read.csv("empty.csv")

coords$timestamp <- as.POSIXct(coords$timestamp, tz = "UTC") 

# defining idle time func
calculate_idle_time <- function(coord1, coord2) {
  elapsed_time <- coord2$timestamp - coord1$timestamp  
  # calculate elapsed time between coordinates
  return(elapsed_time)
}

# total idle time
idle_time <- 0
for (i in 2:nrow(coords)) {
  idle_time <- idle_time + calculate_idle_time(coords[i - 1, ], coords[i, ])
}

# fuel consumption rate (in liters per hour)
fuel_consumption_rate <- 0.1  # 10 liters per hour

# calc total fuel consumption (in liters)
fuel_consumption <- idle_time * fuel_consumption_rate / 3600  # divide idle time by 3600 to convert from seconds to hours


print(fuel_consumption)
