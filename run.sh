#!/bin/bash
if [ $1 == "up" ]; then
    docker-compose up --build -d
fi

if [ $1 == "down" ]; then
    docker-compose down --rmi all -v --remove-orphans
fi
