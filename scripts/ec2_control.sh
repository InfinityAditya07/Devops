#!/bin/bash

INSTANCE_ID="i-0e54c628a35a0cd63"

ACTION=$1

if [ -z "$ACTION" ]; then
  echo "[ERROR] Usage: $0 {start|stop}"
  exit 1
fi

if [ "$ACTION" == "start" ]; then
  echo "[INFO] Requesting START for $INSTANCE_ID..."
  aws ec2 start-instances --instance-ids "i-07a66d9b4cf8666d4"

elif [ "$ACTION" == "stop" ]; then
  echo "[INFO] Requesting STOP for $INSTANCE_ID..."
  aws ec2 stop-instances --instance-ids "i-07a66d9b4cf8666d4"

else
  echo "[ERROR] Invalid action: $ACTION"
  echo "Usage: $0 {start|stop}"
  exit 1

fi
