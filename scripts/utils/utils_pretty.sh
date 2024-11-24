#!/bin/bash

# 스타일 설정
BOLD=$(tput bold)
UNDERLINE=$(tput smul)
RESET=$(tput sgr0)
RED=$(tput setaf 1)
GREEN=$(tput setaf 2)
BLUE=$(tput setaf 4)
YELLOW=$(tput setaf 3)
CYAN=$(tput setaf 6)

# 메시지 출력 함수
info() {
  echo -e "${CYAN}${BOLD}[INFO] $1 ${RESET}"
}

success() {
  echo -e "${GREEN}${BOLD}[SUCCESS] $1 ${RESET}"
}

warn() {
  echo -e "${YELLOW}${BOLD}[WARNING] $1 ${RESET}"
}

error() {
  echo -e "${RED}${BOLD}[ERROR] $1 ${RESET}"
}

divider() {
  local cols=$(tput cols)
  printf "\n${BLUE}%${cols}s${RESET}\n\n" | tr ' ' '='
}

header() {
  local cols=$(tput cols)
  echo
  divider
  echo -e "${BLUE}${BOLD}${UNDERLINE}$1${RESET}"
  divider
  echo
}
