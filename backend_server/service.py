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

RPC_SERVER = SimpleJSONRPCServer((SERVER_HOST, SERVER_PORT))
# expose the addAPI.map add function to'add'API
RPC_SERVER.register_function(add,'add')
print("StartingRPCserveron%s:%d"%(SERVER_HOST,SERVER_PORT))

server.serve_forever()
