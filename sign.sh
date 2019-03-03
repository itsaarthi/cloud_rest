
openssl x509 -req -extfile client.cnf -days 999 -passin "pass:password" -in client-csr.pem -CA ca-crt.pem -CAkey ca-key.pem -CAcreateserial -out client-crt.pem