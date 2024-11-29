import pysolr
import numpy as np
from summarizer import summarize

class WikiBot:
    def __init__(self, topics):
        SOLR_ENDPOINT = 'http://35.209.120.109:8983/solr/IRF24P1'
        self.solr = pysolr.Solr(SOLR_ENDPOINT)
        self.topics = topics

    def updateTopic(self, topics):
        if(type(topics) == np.ndarray):
            self.topics =  [t[0] for t in topics]
        else:
            self.topics =  [t for t in topics]

    def chat(self, query):
        filters = [f'topic:{t}' for t in self.topics]
        filters = " OR ".join(filters)
        results = self.solr.search(f'summary: {query}', fq=filters, row = 4)
        fullText = ""
        for result in results:
            fullText = fullText + " " + result['summary']

        summary = summarize(fullText)
        return summary, self