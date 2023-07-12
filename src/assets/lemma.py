import sys
import time
import socket
import subprocess

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

def request():
    client.connect(('localhost', 9999))
    info = sys.argv[1]
    info = info.encode("utf8")
    client.sendall(info)
    response = client.recv(1024)
    response = response.decode("utf8")
    print(eval(response))

def relaunchServer():
    subprocess.run(["sh", "./restartServerLemma.sh"])

try :
    request()
except :
    relaunchServer()
    time.sleep(20)
    request()
finally :
    client.close()
