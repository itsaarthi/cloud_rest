#!/bin/bash

# FOR CA
wget https://raw.githubusercontent.com/anders94/https-authorized-clients/master/keys/ca.cnf

openssl req -new -x509 -days 9999 -config ca.cnf -keyout ca-key.pem -out ca-crt.pem