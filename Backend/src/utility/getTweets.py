from numpy import dsplit
import requests
import json
import pandas as pd


bearer_token = "xxxxxxxxxxxxxxxxxx"


def create_url(t):

    ids = "ids="+t

    url = "https://api.twitter.com/2/tweets?{}".format(ids)
    return url


def bearer_oauth(r):

    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2TweetLookupPython"
    return r


def connect_to_endpoint(url):
    response = requests.request("GET", url, auth=bearer_oauth)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(
            "Request returned an error: {} {}".format(
                response.status_code, response.text
            )
        )
    return response.json()


def main(t):
    url = create_url(t)
    json_response = connect_to_endpoint(url)
    return json_response


def getData():
    dataSet = pd.read_csv("https://raw.githubusercontent.com/ENCASEH2020/hatespeech-twitter/master/hatespeech_labels.csv")
    w = "ids="+str(dataSet['tweet_id'][0])
    for i in range(1,99799):
        w = w+","+str(dataSet['tweet_id'][i])
    f = open("ids.txt", "w")
    f.write(w)
    f.close()
    print("done")

def setData():
    f = open("ids.txt", "r")
    w = f.read()
    s = w.split(",")
    resp = {
        "data":[]
    }
    for i in range(700):
        temp = s[i*100: 100+(i*100)]
        t = ",".join(temp)
        temp_resp = main(t)
        resp["data"].append(temp_resp["data"][0:])
    f = open("resp1.json", "w")
    f.write(json.dumps(resp, indent=4, sort_keys=True))
    f.close()
    print("done")

if __name__ == "__main__":
    getData()
    # setData()