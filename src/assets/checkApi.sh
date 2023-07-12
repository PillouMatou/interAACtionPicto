#!/bin/bash

service="node"

while :
do
  if pgrep -x "$service" >/dev/null
  then
    sleep 15m
  else
    sh ./restartApi.sh
    echo "Api restarted !"
  fi
done
