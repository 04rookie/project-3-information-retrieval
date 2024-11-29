import numpy as np
from transformers import pipeline

class Classifier:
    def __init__(self):
        self.classifier = pipeline("zero-shot-classification")
        self.candidateLabels = ["Health", "Environment", "Technology ", "Economy", "Entertainment", "Sports", "Politics", "Education", "Travel ", "Food"]

    def classifyTopic(self, text):
        result = self.classifier(text, self.candidateLabels)
        idx = np.argwhere(np.array(result['scores']) > 0.2)

        if(idx.shape[0] == 0): return None #chitchat

        topic = np.array(result['labels'])[idx]
        return topic