import json
import numpy as np

# for n in range (9):
#     file = "data_group" + n + ".json"
#     file = open("data_group0.json")
#     data = json.load(file)
#     file.close()

file = open("data_group0.json")
data = json.load(file)

print("northing check")

print("delete start")
delete_list = set()

for n in data.keys():
    for k, v in data[n].items():
        if v == None:
            delete_list.add(k)

for n in data.keys():
    for m in delete_list:
        del data[n][m]

print("delete end")

print("relevant key time")
relevant_keys = [] 
for k, v in data["TRUCK_ID"].items():
    if v == 0:
        relevant_keys.append(k)

northings = []
for k in relevant_keys:
    northings.append(data["GPSNORTHING"][k])

eastings = []
for k in relevant_keys:
    eastings.append(data["GPSEASTING"][k])

timestamps = []
for k in relevant_keys:
    timestamps.append(data["TIMESTAMP"][k])

fuel_rates = []
for k in relevant_keys:
    fuel_rates.append(data["FUEL_RATE"][k])