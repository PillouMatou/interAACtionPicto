#!/bin/bash

api="node"
lemma="python3"

while :
do
  if pgrep -x "$api" >/dev/null
  then
    if pgrep -x "$lemma" >/dev/null
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
