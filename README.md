# pwa
pwa ejercicio


crear ssl localhost


Se Liga nos comandos:

1- Crie o arquivo v3.ext

$ sudo nano v3.ext

authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = localhost

2- Criar uma chave Raiz

$ sudo openssl genrsa -des3 -out localhost.key 2048


3- Cria um certificado Raiz

$ sudo openssl req -x509 -new -nodes -key localhost.key -sha256 -days 1024 -out localhost.pem


4- Criar um arquivo de solicitação de assinatura de certificado e um arquivo de chave.

$ sudo openssl req -new -nodes -out server.csr -newkey rsa:2048 -keyout server.key


5- Agora sim vamos emitir o certificado SSL 

$ sudo openssl x509 -req -in server.csr -CA localhost.pem -CAkey localhost.key -CAcreateserial -out server.crt -days 500 -sha256 -extfile v3.ext


6- Copiar arquivo server.crt e server.key pro diretório do xampp. 

$ sudo cp server.crt /opt/lampp/etc/ssl.crt/
$ sudo cp server.key /opt/lampp/etc/ssl.key/



Agora é só importar o certificado no navegador, reiniciar o Xampp e ser feliz com SSL Localhost no linux.

https://www.youtube.com/watch?v=afakW-BZv14