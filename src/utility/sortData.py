import json
import pandas as pd

dataSet = pd.read_csv("https://raw.githubusercontent.com/ENCASEH2020/hatespeech-twitter/master/hatespeech_labels.csv")

f =  open("resp1.json", "r")
f1 = open('final.json', "w")
a = []
data = json.load(f)
for j in data['data']:
    for i in j:
        idLabel = dataSet.index[dataSet['tweet_id']==int(i['id'])][0]
        i['label'] = dataSet['label'][idLabel]
        a.append(i)

resp = {
    "data": a
}

f1.write(json.dumps(resp, indent=4))
f1.close()
f.close()