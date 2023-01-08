# Load the coordinates data
coords <- read.csv("empty.csv")

# Pre-process the data
coords$timestamp <- as.POSIXct(coords$timestamp, tz = "UTC")  # Convert timestamps to POSIXct format

# Define the idle time function
calculate_idle_time <- function(coord1, coord2) {
  elapsed_time <- coord2$timestamp - coord1$timestamp  # Calculate elapsed time between coordinates
  return(elapsed_time)
}

# Calculate the total idle time
idle_time <- 0  # Initialize idle time
for (i in 2:nrow(coords)) {
  idle_time <- idle_time + calculate_idle_time(coords[i - 1, ], coords[i, ])
}

# Define the fuel consumption rate (in liters per hour)
fuel_consumption_rate <- 0.1  # 10 liters per hour

# Calculate the total fuel consumption (in liters)
fuel_consumption <- idle_time * fuel_consumption_rate / 3600  # Divide idle time by 3600 to convert from seconds to hours


print(fuel_consumption)  # Print the total fuel consumption
