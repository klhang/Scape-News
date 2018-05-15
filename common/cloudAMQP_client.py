import json
import pika

#	create	client	class,	since we want to connect to	different clound amqp instances
class CloudAMQPClient:
    def __init__(self, cloud_amqp_url, queue_name):
        self.cloud_amqp_url = cloud_amqp_url
        self.queue_name = queue_name
        self.parms = pika.URLParameters(cloud_amqp_url)
        #	only	allow	to	retry	to	build	connection	for	3	seconds
        self.parms.socket_timeout = 3
        self.connection = pika.BlockingConnection(self.parms)
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=queue_name)

    # send a message
    def sendMessage(self, message):
        #	message	is	json	object,	when	send	message	to	queue,  we	need	to	convert	it	to	string
        self.channel.basic_publish(exchange='',
                                   routing_key=self.queue_name,
                                   body=json.dumps(message))
        print("[x] Sent message to %s:%s" % (self.queue_name, message))

    # get a message
    def getMessage(self):
        method_frame, header_frame, body = self.channel.basic_get(self.queue_name)
        #	if	error,	method_frame null
        if method_frame:
            print("[x] Received message from %s:%s" % (self.queue_name, body))
            self.channel.basic_ack(method_frame.delivery_tag)
            #	decode	bytes	to	string,	then	convert	string	to	json format
            return json.loads(body.decode('utf-8'))
        else:
            print("No message returned.")
            return None

    # BlockingConnection.sleep is a safer way to sleep than time.sleep(). This will repond to server's heartbeat.
    def sleep(self, seconds):
        self.connection.sleep(seconds)
