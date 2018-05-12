from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer
SERVER_HOST='localhost'
#useport>3000
SERVER_PORT=4040
#use thisf untion for testing
def add(num1,num2):
print("add is called with %d and %d" % (num1, num2))
return num1 + num2

RPC_SERVER = SimpleJSONRPCServer((SERVER_HOST, SERVER_PORT))
# expose the addAPI.map add function to'add'API
RPC_SERVER.register_function(add,'add')
print("StartingRPCserveron%s:%d"%(SERVER_HOST,SERVER_PORT))

server.serve_forever()
