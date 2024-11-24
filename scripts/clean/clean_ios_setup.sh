#!/bin/bash

# 스크립트 실행 중 에러 발생 시 종료
set -e

# 공용 스타일 함수 로드
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "${SCRIPT_DIR}/../utils/utils_pretty.sh"
source "${SCRIPT_DIR}/../utils/utils_setup_sudo.sh"

# 경로 설정
IOS_DIR="${SCRIPT_DIR}/../../ios"
PROJECT_ROOT="${SCRIPT_DIR}/../.."
ENV_FILE="${PROJECT_ROOT}/.env"

# 캐시 및 빌드 파일 정리
clean_cache() {
  info "Pod와 Xcode/DerivedData 캐시를 삭제합니다..."
  echo "$SUDO_PASSWORD" | sudo -S rm -rf "$IOS_DIR/build" "$IOS_DIR/Pods"
  echo "$SUDO_PASSWORD" | sudo -S rm -rf $HOME/Library/Developer/Xcode/DerivedData
  # yarn clean
  success "캐시 삭제가 완료되었습니다."
}

# rbenv 및 Ruby 설정
setup_ruby() {
  if ! command -v rbenv &>/dev/null; then
    info "rbenv가 설치되지 않았습니다. 설치를 진행합니다..."
    brew install rbenv
    echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >>$HOME/.bash_profile
    echo 'eval "$(rbenv init -)"' >>$HOME/.bash_profile
    source $HOME/.bash_profile
  else
    success "rbenv가 이미 설치되어 있습니다."
  fi

  RUBY_VERSION="3.3.6"
  CURRENT_RUBY_VERSION=$(rbenv version-name)

  if [ "$CURRENT_RUBY_VERSION" != "$RUBY_VERSION" ]; then
    if ! rbenv versions | grep -q "$RUBY_VERSION"; then
      info "Ruby $RUBY_VERSION 설치 중..."
      rbenv install "$RUBY_VERSION"
    fi
    info "Ruby $RUBY_VERSION 활성화..."
    rbenv global "$RUBY_VERSION"
    rbenv rehash
  else
    success "Ruby $RUBY_VERSION 이 이미 활성화되어 있습니다."
  fi
}

# Gem 설치
install_gems() {
  info "Gemfile을 기반으로 Gem 설치를 진행합니다..."
  cd "$IOS_DIR" || exit
  if [ -f "Gemfile.lock" ]; then
    warn "기존 Gemfile.lock을 삭제합니다..."
    echo "$SUDO_PASSWORD" | sudo -S rm -f $IOS_DIR/Gemfile.lock
    gem cleanup
  fi
  if [ -f "$IOS_DIR/Gemfile" ]; then
    gem update --system
    bundle install --force --clean
    success "Gem 설치가 완료되었습니다."
  else
    error "Gemfile이 없습니다. Bundler를 사용할 수 없습니다."
    exit 1
  fi
}

# Pod 설치
install_pods() {
  cd "$IOS_DIR" || exit
  info "iOS Pods 새로 설치 중..."
  pod deintegrate
  pod install --repo-update
  RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
  success "Pod 설치가 완료되었습니다."
}

# 메인 스크립트 실행
main() {
  header "React Native iOS 프로젝트 설정 시작"
  clean_cache
  setup_ruby
  install_gems
  install_pods
  success "설정이 완료되었습니다! iOS 빌드를 시작하려면 'yarn ios'를 실행하세요."
}

main
