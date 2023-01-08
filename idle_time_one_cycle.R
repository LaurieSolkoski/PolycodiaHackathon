# Load the sp and maptools packages
library(sp)
library(maptools)

# Load the coordinates data
coords <- read.csv("empty.csv")

# Pre-process the data
coords$timestamp <- as.POSIXct(coords$timestamp, tz = "UTC")  # Convert timestamps to POSIXct format

# Define the idle time function
calculate_idle_time <- function(coord1, coord2) {
  elapsed_time <- coord2$timestamp - coord1$timestamp  
  
  # Calculate elapsed time between coordinates
  return(elapsed_time)
}

# Calculate the total idle time
idle_time <- 0  # Initialize idle time
for (i in 2:nrow(coords)) {
  idle_time <- idle_time + calculate_idle_time(coords[i - 1, ], coords[i, ])
}

print(idle_time)  # Print the total idle time
