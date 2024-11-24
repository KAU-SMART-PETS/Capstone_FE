#!/bin/bash

LOG_DIR="logs"
LOG_FILE="$LOG_DIR/metro.log"

# 로그 디렉토리 생성
mkdir -p $LOG_DIR

# Metro 서버 백그라운드 실행
echo "[INFO] Metro 서버를 백그라운드에서 실행합니다. 로그는 $LOG_FILE 에 저장됩니다."
yarn start > $LOG_FILE 2>&1 &

# tail로 로그 출력
echo "[INFO] Metro 로그를 출력합니다..."
tail -f $LOG_FILE
