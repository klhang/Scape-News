import json
import os
import sys

import operations

from bson.json_util import dumps
from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer

SERVER_HOST = 'localhost'
SERVER_PORT = 4040

def add(a, b):
    """ Add two numbers. """
    return a + b

def get_one_news():
    """ Get one news. """
    print ("get_one_news is called")
    return json.loads(dumps(operations.getOneNews()))

def get_news_summaries_for_user(user_id, page_num):
    print(user_id)
    """ Get news summaries for user. """
    print("get news summaries for userID: %s with pageNum: %s" % (user_id, page_num))
    return operations.getNewsSummariesForUser(user_id, page_num)

# Threading RPC Server
RPC_SERVER = SimpleJSONRPCServer((SERVER_HOST, SERVER_PORT))
RPC_SERVER.register_function(add, 'add')
RPC_SERVER.register_function(get_one_news, 'getOneNews')
RPC_SERVER.register_function(get_news_summaries_for_user, 'getNewsSummariesForUser')


print("Starting RPC server on %s:%d" % (SERVER_HOST, SERVER_PORT))

RPC_SERVER.serve_forever()
