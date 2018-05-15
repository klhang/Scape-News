import requests

from json import loads

NEWS_API_ENDPOINT = "http://newsapi.org/v1/"
NEWS_API_KEY = '80b49c11c89145939703c4157f2b78f8'
ARTICLES_API = 'articles'

#	define	constant
CNN = 'cnn'
DEFAULT_SOURCES = [CNN]
SORT_BY_TOP = 'top'

def _buildUrl(endPoint=NEWS_API_ENDPOINT, apiName=ARTICLES_API):
    return endPoint + apiName

def getNewsFromSource(sources=DEFAULT_SOURCES, sortBy=SORT_BY_TOP):
    articles = []
    #	get	news	from	each	source
    for source in sources:
        payload = {'apiKey': NEWS_API_KEY,
                   'source': source,
                   'sortBy': sortBy}

        response = requests.get(_buildUrl(), params=payload)
        #	response.content	is	a	binary
        res_json = loads(response.content.decode('utf-8'))

        # Extract news from response
        if (res_json is not None and
            res_json['status'] == 'ok' and
                res_json['source'] is not None):
            # populate news source in each articles
            for news in res_json['articles']:
                news['source'] = res_json['source']

            articles.extend(res_json['articles'])

    return articles
