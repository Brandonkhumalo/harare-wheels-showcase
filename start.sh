#!/bin/bash

cd /home/runner/workspace

cd server && python app.py &
cd /home/runner/workspace

npm run dev
