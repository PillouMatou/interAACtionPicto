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
    fi
  else
    sh ./restartApi.sh
  fi
done
