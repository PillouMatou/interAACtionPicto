import socket
import fr_core_news_sm

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('localhost', 9999))

nlp = fr_core_news_sm.load(exclude=["ner"])
nlp.get_pipe("lemmatizer").lookups.get_table("lemma_rules")["verb"] += [['e', 'er'], ['ent', 'er']]
textLemma = []
lemmaTags = {"VERB"}

def lemma(text):
    for token in text:
        if token.tag_ in lemmaTags:
            textLemma.append(token.lemma_)
        else:
            textLemma.append(token.text)

while(1):
    server.listen(1)
    conn, addr = server.accept()
    data = conn.recv(1024)
    data = data.decode("utf8")
    lemma(nlp(data)
    response = str(textLemma).encode("utf8")
    conn.sendall(response)
    conn.close()
    nlp.get_pipe("lemmatizer").cache = {}
    textLemma = []
