import json

# Load the JSON data from a file
with open('conf.json', 'r') as file:
    data = json.load(file)

# Define keywords for national conferences
national_keywords = ["India", "Bharat", "Bengaluru", "Kanpur", "Guwahati", "Hyderabad", "Thiruvananthapuram", "Pune"]

# Initialize lists for national and international conferences
national_conf = []
international_conf = []

# Separate the conferences based on location
for conference in data:
    if any(keyword in conference['location'].lower() for keyword in [e.lower() for e in national_keywords]):
        national_conf.append(conference)
    else:
        international_conf.append(conference)

# Write national conferences to national_conf.json
with open('national_conf.json', 'w') as file:
    json.dump(national_conf, file, indent=4)

# Write international conferences to international_conf.json
with open('international_conf.json', 'w') as file:
    json.dump(international_conf, file, indent=4)
