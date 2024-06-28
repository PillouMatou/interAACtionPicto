#!/bin/bash

api="startapi.js"
lemma="serverLemma.py"

while :
do
  if pgrep -f "$api" >/dev/null
  then
    if pgrep -f "$lemma" >/dev/null
    then
      sleep 15m
    else
      sh ./restartServerLemma.sh
      sleep 5m
    fi
  else
    sh ./restartApi.sh
    sleep 5m
  fi
done
