import csv
import json

csv_file_path = "./SampleSubmission2023.csv"
json_file_path = "./SampleSubmission2023.json"

data = []

# Read CSV file and convert to list of dictionaries
def convert_csv_to_json(csv_file_path, json_file_path):
    print('converting csv ' + csv_file_path + ' to json')    
    with open(csv_file_path, "r") as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            data.append(row)

    # Write JSON file
    with open(json_file_path, "w") as json_file:
        json.dump(data, json_file)
    print('done converting csv ' + csv_file_path 'to ' + json_file_path)


if __name__ == "__main__":
    convert_csv_to_json(csv_file_path=csv_file_path, json_file_path=json_file_path)