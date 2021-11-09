import pickle
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem.porter import PorterStemmer
import pandas as pd
import re
import sys

vectorizer = TfidfVectorizer()
df = pd.read_csv('./cleaned_data.csv')
vector = vectorizer.fit_transform(df['clean_tweet'].values.astype('U'))


loadedModel = pickle.load(open('./logistic_regression_model.sav', 'rb'))
def cleanText(text):
    text = re.sub(r'@[A-Za-z0-9]+','',text) # Removing @mentions
    text = re.sub(r'#','',text) # Removing the '#' symbol
    text = re.sub(r'RT[\s]+','',text) # Removing RT
    text = re.sub(r'https?:\/\/\S+','',text) # Removing hyperlinks
    text = re.sub(r'[^a-zA-Z ]',' ', text) # Removing all the punctuations and numbers
    text = text.lower()
    return text

stop_words = set(stopwords.words('english'))
def removeStopWords(text):
    words = word_tokenize(text)
    filtered_sentence = [w for w in words if not w in stop_words]
    return filtered_sentence

stemmer = PorterStemmer()
def stemText(text):
    text = [stemmer.stem(word) for word in text]
    return text

def cleanInput(text):    
    text = cleanText(text)
    text = removeStopWords(text)
    text = stemText(text)
    text = ' '.join([str(elem) for elem in text])
    text = [text]
    return text

inp = ' '.join(sys.argv[1:])
inp = cleanInput(inp)
data = vectorizer.transform(inp)

pred = loadedModel.predict(data)
print(pred[0])
sys.stdout.flush()