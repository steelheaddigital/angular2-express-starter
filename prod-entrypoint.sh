#!/bin/bash

cd client 
jspm install
cd ../
gulp migrate:latest 
npm start
