from cloudAMQP_client import CloudAMQPClient

TEST_CLOUDAMQP_URL = "amqp://ebkoztfh:MalzDp3ko7bPlUDzyso3rbO3jsp2h7lZ@skunk.rmq.cloudamqp.com/ebkoztfh"
TEST_QUEUE_NAME = "Tap-news"

def test_basic():
    client = CloudAMQPClient(TEST_CLOUDAMQP_URL, TEST_QUEUE_NAME)

    sentMsg = {'test':'test'}
    client.sendMessage(sentMsg)
    receivedMsg = client.getMessage()
    assert sentMsg == receivedMsg
    print('test_basic passed.')

if __name__ == "__main__":
    test_basic()
