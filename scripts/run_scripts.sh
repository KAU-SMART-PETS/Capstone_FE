#!/bin/bash

# 스크립트 실행 중 에러 발생 시 종료
set -e

# 공용 스타일 함수 로드
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "${SCRIPT_DIR}/utils/utils_pretty.sh"

# 실행 가능한 스크립트 경로 설정
CLEAN_ANDROID="${SCRIPT_DIR}/clean/clean_android_setup.sh"
CLEAN_IOS="${SCRIPT_DIR}/clean/clean_ios_setup.sh"
DEPLOY_ANDROID="${SCRIPT_DIR}/deploy/deploy_android.sh"
DEPLOY_IOS="${SCRIPT_DIR}/deploy/deploy_ios.sh"
START_METRO="${SCRIPT_DIR}/start_mecro.sh"

# 메뉴 출력
show_menu() {
  header "스크립트 실행 메뉴"
  
  echo -e "\n${BLUE}${BOLD}📡 매크로 서버 관리${RESET}"
  echo "  1) Metro 서버 시작 스크립트 실행"

  echo -e "\n${YELLOW}${BOLD}🛠️ 환경 정리${RESET}"
  echo "  2) Android 환경 정리 스크립트 실행"
  echo "  3) iOS 환경 정리 스크립트 실행"

  echo -e "\n${GREEN}${BOLD}🚀 배포${RESET}"
  echo "  4) Android 배포 스크립트 실행"
  echo "  5) iOS 배포 스크립트 실행"

  echo -e "\n${CYAN}${BOLD}ℹ️ 기타${RESET}"
  echo "  h) 사용법 보기"
  echo "  q) 종료"

  divider
}

# 사용법 출력
usage() {
  header "사용법"
  echo "터미널에서 번호를 입력하여 스크립트를 실행할 수 있습니다."
  echo
  echo "메뉴의 각 섹션은 다음과 같습니다:"
  echo -e "  ${BLUE}${BOLD}📡 매크로 서버 관리${RESET}: Metro 서버 시작"
  echo -e "  ${YELLOW}${BOLD}🛠️ 환경 정리${RESET}: Android 및 iOS 정리 스크립트"
  echo -e "  ${GREEN}${BOLD}🚀 배포${RESET}: Android 및 iOS 배포 스크립트"
  divider
}

# 스크립트 실행
execute_script() {
  case "$1" in
    1)
      info "Metro 서버 시작 스크립트를 실행합니다..."
      bash "$START_METRO"
      ;;
    2)
      info "Android 환경 정리 스크립트를 실행합니다..."
      bash "$CLEAN_ANDROID"
      ;;
    3)
      info "iOS 환경 정리 스크립트를 실행합니다..."
      bash "$CLEAN_IOS"
      ;;
    4)
      info "Android 배포 스크립트를 실행합니다..."
      bash "$DEPLOY_ANDROID"
      ;;
    5)
      info "iOS 배포 스크립트를 실행합니다..."
      bash "$DEPLOY_IOS"
      ;;
    h)
      usage
      ;;
    q)
      info "스크립트를 종료합니다."
      exit 0
      ;;
    *)
      error "잘못된 입력입니다. 다시 선택해주세요."
      ;;
  esac
}

# 메인 실행
main() {
  while true; do
    show_menu
    read -p "실행할 작업을 선택하세요 (1-5, h, q): " choice
    execute_script "$choice"
  done
}

main
