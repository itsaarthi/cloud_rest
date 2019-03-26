#!/bin/bash

# FOR CA
mkdir -p /etc/m2m/cloud/

wget https://raw.githubusercontent.com/anders94/https-authorized-clients/master/keys/ca.cnf

openssl req -new -x509 -days 9999 -config ca.cnf -keyout ca-key.pem -out ca-crt.pem



cp ca-* /etc/m2m/cloud/