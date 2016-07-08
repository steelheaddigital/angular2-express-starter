Express/Angular2 Starter
========================
This is a starter template for an Angular2 application with an express JSON API backend.  It uses JSPM for client side dependencey management.

Install Dev Environment
=======================
1. Clone this repo
2. Install Vagrant and Virtualbox
3. In the directory where you cloned this repo, run

`vagrant up`

4. SSH into the new VM with

`vagrant ssh`

5. Start the app

`cd /vagrant && docker-compose up -d`

A few other useful commands
---------------------------
Start with production settings

`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

Run tests

`docker-compose run --rm test gulp test:server`