#!/bin/bash

# 스크립트 실행 중 에러 발생 시 종료
set -e

# 공용 유틸리티 로드
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "${SCRIPT_DIR}/../utils/utils_pretty.sh"
source "${SCRIPT_DIR}/../utils/utils_setup_sudo.sh"

# 환경 설정
PROJECT_ROOT="${SCRIPT_DIR}/../.."
ANDROID_DIR="${PROJECT_ROOT}/android"
GRADLE_CACHE_DIR="${HOME}/.gradle/caches"

# 아키텍처 감지
detect_architecture() {
  ARCH=$(uname -m)
  case $ARCH in
    x86_64)
      TARGET_ARCH="x86_64"
      ;;
    arm64)
      TARGET_ARCH="arm64-v8a"
      ;;
    i686 | x86)
      TARGET_ARCH="x86"
      ;;
    armv7l | arm)
      TARGET_ARCH="armeabi-v7a"
      ;;
    *)
      TARGET_ARCH="unknown"
      warn "알 수 없는 아키텍처($ARCH)입니다. 기본 설정을 사용합니다."
      ;;
  esac
  info "감지된 아키텍처: $TARGET_ARCH"
}

# 기존 Gradle daemon 종료
stop_gradle_daemon() {
  info "기존에 실행 중인 Gradle daemon을 종료합니다! (yarn start의 metro 포함)"
  gradle --stop
}

# Gradle 및 Android 빌드 캐시 정리
clean_caches() {
  header "Gradle 캐시 정리"
  info "Gradle 및 Android 빌드 캐시를 정리하는 중..."
  echo "$SUDO_PASSWORD" | sudo -S rm -rf "${GRADLE_CACHE_DIR}" "${HOME}/.gradle/caches" "${HOME}/.gradle/caches/**/kotlin-dsl" || true
  success "Gradle 캐시 정리가 완료되었습니다."
}

# Android 빌드 디렉토리 정리
clean_build_dirs() {
  header "Android 빌드 디렉토리 정리"
  info "Android 빌드 디렉토리를 정리합니다..."
  echo "$SUDO_PASSWORD" | sudo -S rm -rf "${ANDROID_DIR}/app/build" "${ANDROID_DIR}/app/.cxx" "${ANDROID_DIR}/build" "${ANDROID_DIR}/.gradle" "${ANDROID_DIR}/.idea" || true
  success "Android 빌드 디렉토리 정리가 완료되었습니다."
}

# 의존성 설치
install_dependencies() {
  header "의존성 설치"
  info "의존성을 설치합니다..."
  echo "$SUDO_PASSWORD" | sudo -S rm -rf "${PROJECT_ROOT}/node_modules" "${PROJECT_ROOT}/.yarn" || true
  yarn install
  success "의존성 설치가 완료되었습니다."
}

# Gradle 클린 및 빌드 실행
gradle_clean_and_build() {
  header "Gradle 클린 및 Android 빌드 실행"
  info "Gradle 클린 및 Android 빌드를 실행합니다..."
  cd "${ANDROID_DIR}" || exit
  ./gradlew clean
  # if ./gradlew build -PreactNativeArchitectures="${TARGET_ARCH}" --stacktrace --info; then
  #   success "Gradle 클린 및 빌드가 완료되었습니다!"
  # else
  #   error "Gradle 빌드 중 오류가 발생했습니다."
  #   exit 1
  # fi
  gradle --stop 
}

# 메인 함수
main() {
  header "스크립트 시작"
  detect_architecture
  stop_gradle_daemon
  clean_caches
  clean_build_dirs
  # install_dependencies
  gradle_clean_and_build
  success "모든 작업이 성공적으로 완료되었습니다."
}

main
