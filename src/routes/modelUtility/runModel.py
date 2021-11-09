import pickle
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
from sklearn import *

vectorizer = TfidfVectorizer()
data = pd.read_csv('./data.csv')

vector = vectorizer.fit_transform(data['clean_tweet'])
loadedModel = pickle.load(open('./logistic_regression_model.sav', 'rb'))
pred = loadedModel.predict(vector)
print(pred)