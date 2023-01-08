#libraries
install.packages("tidyverse")
library(tidyverse)

# scan .csv file
df <- read_csv("data_group0.csv")

# extract columns for time stamp, gps coordinates, truck ID
TIME_STAMP <- df$TIMESTAMP
col1 <- df$GPSNORTHING
col2 <- df$GPSEASTING
TRUCK_ID <- df$TRUCK_ID

print(TIME_STAMP)
print(col1)
print(col2)
print(truck_ID)


# combine into new data frame
df2 <- data.frame(TRUCK_ID, TIME_STAMP, col1, col2)


write.csv(df2, "group0_coord.csv")
