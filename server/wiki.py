import pysolr
import numpy as np
from summarizer import summarize
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords

nltk.download('words')
nltk.download('stopwords')
nltk.download('punkt_tab')

stop_words = set(stopwords.words('english'))
english_words = set(nltk.corpus.words.words())

class WikiBot:
    def __init__(self, topics):
        SOLR_ENDPOINT = 'http://35.209.120.109:8983/solr/testing'
        self.solr = pysolr.Solr(SOLR_ENDPOINT)
        self.topics = topics

    def updateTopic(self, topics):
        if(type(topics) == np.ndarray):
            self.topics =  [t[0] for t in topics]
        else:
            self.topics =  [t for t in topics]
    
    def preprocess(self, text):
        tokens = word_tokenize(text.lower())
        tokens = [word for word in tokens if word not in stop_words]
        return " ".join(tokens)

    def capitalize(self, text):
        sentences = sent_tokenize(text)
        sent = [ s.capitalize() for s in sentences]
        return ' '.join(sent)


    def chat(self, query):
        filters = [f'topic:{t}' for t in self.topics]
        filters = " OR ".join(filters)
        query = self.preprocess(query)
        try:
            params = {'defType': 'edismax',
                   'qf': 'summary^3 title^5', 
                   'pf': 'summary^10 title^15',  
                   'bq': f'title:({query})^2 summary:({query})^1.5',  
                   'mm': '2<-1 5<-2',  
                   'ps': 3,  
                   'qs': 2,  
                   'tie': 0.2, 
                   'rows': 4,  
                 }
            results = self.solr.search(query, fq=filters, **params)
        except:
            results = []
        fullText = ""
        urls = []
        for result in results:
            fullText = fullText + " " + result['summary']
            urls.append(result['url'])

        summary = summarize(fullText)
        if(len(urls) == 0): 
            summary = "Oops! My knowledge database seems to be on a vacation :("
        response = { "message": self.capitalize(summary), "meta": { "urls": urls, "topics":  self.topics}  } 
        return response, self
