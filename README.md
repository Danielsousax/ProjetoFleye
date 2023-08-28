# Configuração no ambiente linux

Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*

# Install the OpenSSH Client
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0

# Install the OpenSSH Server
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0

sudo apt-get update

sudo apt-get upgrade

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash

sudo apt-get install -y nodejs

 git clone https://github.com/Danielsousax/ProjetoFleye.git

npm install

node server.js
