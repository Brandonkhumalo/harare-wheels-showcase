#!/bin/bash

cd /home/runner/workspace

python server/app.py &
npm run dev
