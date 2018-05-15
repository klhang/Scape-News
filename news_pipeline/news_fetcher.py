import os
import sys

from newspaper import Article

#	import	common	package	in	parent	directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
# sys.path.append(os.path.join(os.path.dirname(__file__), 'scraper'))
# import cnn_news_scraper

from cloudAMQP_client import CloudAMQPClient

SCRAPE_NEWS_TASK_QUEUE_URL = 'amqp://cnjyollz:Vw2CDPAN_81hw3pK8Y0-aWso8-cM1N4o@otter.rmq.cloudamqp.com/cnjyollz'
SCRAPE_NEWS_TASK_QUEUE_NAME = 'Scrape-news-task'
DEDUPE_NEWS_TASK_QUEUE_URL = 'amqp://pktbqgun:-REv8i2rB_Rc-xfHiyiMz55lYDRZ_nEI@otter.rmq.cloudamqp.com/pktbqgun'
DEDUPE_NEWS_TASK_QUEUE_NAME = 'Dedupe-news-task'

SLEEP_TIME_IN_SECONDS = 5

dedupe_news_queue_client = CloudAMQPClient(DEDUPE_NEWS_TASK_QUEUE_URL, DEDUPE_NEWS_TASK_QUEUE_NAME)
# save news object(added scaped text section using ARTICLES_API from newspaper), sent to deduper component to filter out news with high similarity using tf-idf
scrape_news_queue_client = CloudAMQPClient(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)
# save news object as original from NewsAPI, filltered by title using redis comparing hashing digest. sent to scaper component to scape text of the news.

def handle_message(msg):
    if msg is None or not isinstance(msg, dict):
        print('message is broken')
        return

    task = msg
    text = None

    article = Article(task['url'])
    article.download()
    article.parse()

    task['text'] = article.text
    dedupe_news_queue_client.sendMessage(task)

while True:
    if scrape_news_queue_client is not None:
        msg = scrape_news_queue_client.getMessage()
        if msg is not None:
            # Parse and process the task
            try:
                handle_message(msg)
            except Exception as e:
                print(e)
                pass
        scrape_news_queue_client.sleep(SLEEP_TIME_IN_SECONDS)
