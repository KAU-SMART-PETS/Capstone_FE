#!/bin/bash

# 스크립트 실행 중 에러 발생 시 종료
set -e

# 공용 스타일 함수 로드
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "${SCRIPT_DIR}/../utils/utils_pretty.sh"
source "${SCRIPT_DIR}/../utils/utils_setup_sudo.sh"

# 경로 설정
IOS_DIR="${SCRIPT_DIR}/../../ios"

# Fastlane 배포
deploy() {
  info "Fastlane을 통해 iOS 배포를 시작합니다..."
  cd "$IOS_DIR" || exit
  bundle exec fastlane ios beta
  success "iOS 배포가 완료되었습니다!"
}

# 메인 실행
main() {
  header "iOS 배포 스크립트 실행"
  load_env
  deploy
}

main
