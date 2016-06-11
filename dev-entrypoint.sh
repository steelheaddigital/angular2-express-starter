#!/bin/bash

npm install
cd client && jspm install
cd ../server && typings install
cd ../
gulp migrate:latest 
gulp
