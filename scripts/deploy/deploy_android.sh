#!/bin/bash

# 스크립트 실행 중 에러 발생 시 종료
set -e

# 공용 스타일 함수 로드
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "${SCRIPT_DIR}/../utils/utils_pretty.sh"
source "${SCRIPT_DIR}/../utils/utils_setup_sudo.sh"

# 환경 설정
ANDROID_DIR="${SCRIPT_DIR}/../../android"

# Gradle 배포 빌드
run_build() {
  info "Android 배포용 빌드를 시작합니다..."
  cd "${ANDROID_DIR}" || exit

  # APK/AAB 빌드
  echo "$SUDO_PASSWORD" | sudo -S ./gradlew assembleDebug --stacktrace --info
  success "배포 빌드가 완료되었습니다!"
}

# 빌드된 파일 확인
check_build_files() {
  OUTPUT_DIR="${ANDROID_DIR}/app/build/outputs"
  APK_FILE=$(find "${OUTPUT_DIR}/apk/release" -name "*.apk" || true)
  # AAB_FILE=$(find "${OUTPUT_DIR}/bundle/release" -name "*.aab" || true)

  if [ -f "${APK_FILE}" ]; then
    info "APK 파일 생성: ${APK_FILE}"
  else
    error "APK 파일을 찾을 수 없습니다."
  fi

  # if [ -f "${AAB_FILE}" ]; then
  #   info "AAB 파일 생성: ${AAB_FILE}"
  # else
  #   error "AAB 파일을 찾을 수 없습니다."
  # fi

  success "Android 빌드 및 배포가 완료되었습니다!"
  gradle --stop
}

# 메인 실행
main() {
  header "Android 배포 빌드 시작"
  run_build
  check_build_files
}

main
