import json
import pickle
import os
import redis
import sys

from datetime import datetime
from bson.json_util import dumps

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
import mongodb_client   # pylint: disable=E0401, C0413

NEWS_TABLE_NAME = "deduped_news"

REDIS_HOST = "localhost"
REDIS_PROT = 6379
redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PROT, db=0)

NEWS_LIST_BATCH_SIZE = 10    #	number of news in single page
NEWS_LIST_LIMIT = 200       #	maximum	number of news of one fetch from mongdDB
USER_NEWS_TIMEOUT_IN_SECONDS = 60  # timeout for user's	pagination info	in redis

def getOneNews():
    db = mongodb_client.get_db()
    news = db[NEWS_TABLE_NAME].find_one()
    return news


def getNewsSummariesForUser(user_id, page_num):
    page_num = int(page_num)
    # page range to be fetched for the page number
    begin_index = (page_num - 1) * NEWS_LIST_BATCH_SIZE
    end_index = page_num * NEWS_LIST_BATCH_SIZE

    # the final list of news to be returned
    sliced_news = []
    db = mongodb_client.get_db()

    if redis_client.get(user_id) is not None:
        # user id already cached in redis, get next pagination data and fetch news
        news_digest = pickle.loads(redis_client.get(user_id))
        # both parameters are inclusive
        sliced_news_digest = news_digest[begin_index : end_index]
        sliced_news = list(db[NEWS_TABLE_NAME].find({'digest':{'$in':sliced_news_digest}}))
    else:
        ## no cached data -
        ## retrieve news and store their digest list in redis with user id as key

        # first, retrieve all news and sort by publish time in reverse order (latest first)
        total_news = list(db[NEWS_TABLE_NAME].find().sort([('publishedAt', -1)]).limit(NEWS_LIST_LIMIT))
        total_news_digest = [x['digest'] for x in total_news]
        # for test -
        # print (total_news_digest)

        redis_client.set(user_id, pickle.dumps(total_news_digest))
        redis_client.expire(user_id, USER_NEWS_TIMEOUT_IN_SECONDS)

        sliced_news = total_news[begin_index : end_index]

    for news in sliced_news:
        # Remove text field to save bandwith
        del news['text']
        if news['publishedAt'].date() == datetime.today().date():
            # Add time tag to be displayed on page
            news['time'] = 'today'

    return json.loads(dumps(sliced_news))


def	test_getNewsSummariesForUser_basic():
 				news = getNewsSummariesForUser('test',	1)
 				assert	len(news)	>	0
 				print('test_getNewsSummariesForUser_basic	passed!')

if	__name__==	"__main__":
				test_getNewsSummariesForUser_basic()
