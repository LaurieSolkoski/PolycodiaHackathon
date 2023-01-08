# Load the necessary libraries
install.packages("tidyverse")
library(tidyverse)

# Read in the .csv file
df <- read_csv("data_group0.csv")

# Extract the desired columns
TIME_STAMP <- df$TIMESTAMP
col1 <- df$GPSNORTHING
col2 <- df$GPSEASTING
TRUCK_ID <- df$TRUCK_ID

# Print the extracted columns
print(TIME_STAMP)
print(col1)
print(col2)
print(truck_ID)


# Combine the variables into a data frame
df2 <- data.frame(TRUCK_ID, TIME_STAMP, col1, col2)

# Save the data frame to a .csv file
write.csv(df2, "group0_coord.csv")
