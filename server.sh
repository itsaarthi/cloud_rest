openssl genrsa -out server-key.pem 4096
wget https://raw.githubusercontent.com/anders94/https-authorized-clients/master/keys/server.cnf
openssl req -new -config server.cnf -key server-key.pem -out server-csr.pem
openssl x509 -req -extfile server.cnf -days 999 -passin "pass:password" -in server-csr.pem -CA ca-crt.pem -CAkey ca-key.pem -CAcreateserial -out server-crt.pem