#!/bin/bash

# 스크립트 실행 중 에러 발생 시 종료
set -e

# 공용 스타일 함수 로드
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "${SCRIPT_DIR}/../utils/utils_pretty.sh"

# .env 파일에서 환경변수 로드
load_env() {
  ENV_FILE="$(cd "$(dirname "$0")" && pwd)/../../.env"
  if [ -f "$ENV_FILE" ]; then
    while IFS= read -r line || [[ -n "$line" ]]; do
      # 주석(#)이 아닌 줄만 처리
      if [[ ! $line =~ ^# && $line =~ = ]]; then
        eval "export $line"
      fi
    done < "$ENV_FILE"
    success ".env 파일에서 환경변수를 로드했습니다."
  else
    warn ".env 파일을 찾을 수 없습니다. 비밀번호를 직접 입력하세요."
  fi
}

# SUDO 비밀번호 설정 및 캐시 갱신
setup_sudo_password() {
  if [ -z "$SUDO_PASSWORD" ]; then
    info "SUDO_PASSWORD 환경변수가 설정되지 않았습니다. 비밀번호를 입력하세요."
    read -sp "macOS 사용자 비밀번호를 입력하세요 (sudo 권한): " SUDO_PASSWORD
    echo
    export SUDO_PASSWORD
  else
    success "SUDO_PASSWORD가 환경변수에서 로드되었습니다."
  fi

  # SUDO 인증 캐시 갱신
  echo "$SUDO_PASSWORD" | sudo -S echo "" > /dev/null 2>&1 || {
    error "sudo 인증 실패. 비밀번호를 다시 입력하세요."
    unset SUDO_PASSWORD
    setup_sudo_password
  }
  success "sudo 인증이 완료되었습니다!"
}

# 실행 함수
main() {
  header "환경변수 로드 및 sudo 설정"
  load_env
  setup_sudo_password
  success "환경변수 로드 및 sudo 설정이 완료되었습니다."
}

main
