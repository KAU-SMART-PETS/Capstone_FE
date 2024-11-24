
# 프로젝트 README

> 작성자: 남서아 (Wendy-Nam)

## 빌드 스크립트

`script/` 디렉토리에 빌드/배포 관련 자동 스크립트를 추가했습니다. 

이 스크립트들은 배포용 빌드 또는 환경 재구성이나 오류 해결에 사용되며, 일반적인 실행에는 필요하지 않습니다.

### 실행 방법
- **프로젝트 루트**에서 아래 명령어 실행:
  ```bash
  yarn start:script
   ```

## 주요 내용

- **Clean 스크립트**: 의존성 재설치, 빌드 파일 및 캐시 정리.
   - 일부 명령어는 주석 처리되어 있으며, 필요 시 주석을 해제해 사용 가능합니다. (`yarn clean`, `rm -rf node_modules` 등)
   - Gradle 설정: 빌드 가속화를 위해 **Gradle daemon**을 병렬로 사용하므로, 빌드 전후 `gradle --stop`으로 이전 프로세스를 정리하도록 했습니다.
      - 다만, 여러 프로세스를 실행 중이라면 해당 부분을 주석 처리하거나, 한 번에 하나씩 실행해야 합니다.

- **Deploy 스크립트**: 배포용 빌드 제작, 배포 자동화


## iOS 빌드 및 배포 자동화

iOS용 테스트 및 배포 빌드 파일을 생성하려면 반드시 `macOS`와 `Xcode`가 필요합니다. 
아래는 빌드 및 배포 과정에서 필요한 주요 사항입니다.

---

### iOS 빌드 사전 준비

1. **Apple ID 등록**  
   - Xcode의 `Signing & Capabilities` 섹션에 본인의 **Apple ID**를 등록하세요.
   - **Apple ID 등록은 필수**이며, 하지 않으면 iOS 빌드(시뮬레이터 포함)가 불가능합니다.

2. **무료 계정의 한계**  
   - 무료 Apple ID로는 USB 연결을 통한 기기 테스트만 가능합니다.
   - `TestFlight` 및 `App Store` 배포를 위해서는 연간 약 **12만 원 이상의 Apple Developer Program** 구독이 필요합니다.
   - `Firebase`로 앱을 전달하는 것이 가능하나, **애플개발자 계정(유료)**에 해당 테스터 기기를 등록해야만 앱 실행이 가능합니다.

3. **환경 변수 설정**  
   - 프로젝트 루트 경로에 `.env` 파일을 생성하여 배포와 관련된 정보를 입력하세요.
   - `Fastlane` 실행 시 해당 정보를 사용해 Firebase에 iOS 빌드(IPA 파일)를 업로드할 수 있습니다.
   - 지정된 테스터는 **이메일 초대**를 받아 앱을 설치할 수 있습니다.
   
      ```plaintext
      # Keychain 설정 (없는 경우 배포스크립트에서 새로 생성하게 됨)
      KEYCHAIN_PATH="/Users/username/Library/Keychains/login.keychain-db"

      # Apple 계정 정보
      APPLE_USER="애플_계정_이메일"
      APPLE_PASSWORD="애플_계정_비밀번호"
      APPLE_TEAM_ID="애플_팀_아이디"

      # macOS 사용자 비밀번호
      FASTLANE_KEYPASS="맥_계정_비밀번호"
      SUDO_PASSWORD="root_패스워드"

      # Firebase 배포 정보
      FIREBASE_APP_ID="firebase에 생성한 각자의 앱 프로젝트 id"
      FIREBASE_TESTERS="테스터1@example.com,테스터2@example.com"
      FIREBASE_GROUPS="테스트_그룹명"
      FIREBASE_RELEASE_NOTES="원하는 빌드 메시지"
      ```

### Firebase를 통한 배포 자동화

`Firebase` 배포 시, 초대받은 테스터는 아래 과정을 통해 앱을 설치할 수 있습니다:

1. 초대 링크로 Firebase 프로필을 다운로드.
2. 휴대폰 설정에서 Firebase 프로필 설치 진행.
3. 1번의 페이지로 돌아가, 기기 등록 후 테스트 앱 설치.

### iOS 배포 스크립트

```bash
yarn ios:fastlane
```

위 명령어 실행 시 `Fastlane`을 통해 `Firebase`로 앱이 배포됩니다.  
**TestFlight 배포**는 유료 계정이 필요하므로, 먼저 Firebase를 통해 **배포 파일 전달부터 구현**했습니다.

---

## 컴포넌트 문서화 (storybook 활용)

[@Wendy-Nam 제작](https://wendy-jmcomponents-rn.vercel.app/)  
Storybook을 통해 컴포넌트 테스트 및 코드 복사 기능을 제공합니다.

### 주요 기능
- 컴포넌트의 경로 및 사용 방법 설명.
- 옵션 및 스타일링 관련 설정 제공.
- 예제 코드를 바로 복사하여 적용 가능.

Storybook은 프로젝트와 별도로 관리되므로, 간혹 최신 상태와 다를 수 있습니다. 

주요 컴포넌트 변경 이후, 스토리북 작성자(@Wendy-Nam)가 별도로 Storybook을 다시 업데이트하게 됩니다.

---

## 디렉토리 구조

### 주요 디렉토리 및 파일 설명

#### `src` 디렉토리:
- **`App`**: 애플리케이션의 메인 엔트리 파일.
- **`navigation`**: 네비게이션 설정 파일.

#### 주요 폴더:
1. **`api`**: API 호출 및 더미 데이터 관리.
2. **`assets`**: 폰트, 이미지, SVG 저장소.
3. **`components`**: 재사용 가능한 UI 컴포넌트.
4. **`screens`**: 각 화면 컴포넌트.
5. **`utils`**: 상수, 타입, 유틸리티 함수.

---

## UTILS

### 주요 상수 및 설정
- **상수 관리**: `utils/constants/` 디렉토리에서 관리.
- **타입 정의**: `utils/constants/types.ts`에서 프로젝트 전반에서 사용할 타입을 정의.

   ```ts
   import { SomeType } from '@types';
   ```

### 주요 파일:
- **`config.ts`**: API 기본 URL 및 주요 설정값 저장.
- **`types.ts`**: 공통 타입 정의. (api 반환값 관련)

---

### 경로 Alias 사용
프로젝트 경로 관리를 위해 Alias를 활용합니다.

#### Alias 설정 예시:
| Alias           | 경로                     |
|------------------|--------------------------|
| **`@api`**      | `./src/api`              |
| **`@data`**     | `./src/api/data`         |
| **`@components`** | `./src/components`       |
| **`@common`** | `./src/components/common`       |
| **`@screens`**  | `./src/screens`          |
| **`@constants`**| `./src/utils/constants`  |
| **`@types`**    | `./src/utils/constants/types` |
| **`@image`**    | `./src/assets/image`     |

#### 설정 업데이트:

- `babel.config.js`와 `tsconfig.json`에 위와 같은 alias를 추가로 등록 가능. 
- 절대경로를 참조하여, import문이 간결해지고 파일의 경로이동이 자유로워짐.

## 참고 : Commit Type

| **Type**      | **설명**                                                   |
|---------------|----------------------------------------------------------|
| **Feat**      | 새로운 기능 추가                                           |
| **Fix**       | 버그 수정 또는 typo                                        |
| **Refactor**  | 리팩토링                                                  |
| **Design**    | CSS 등 사용자 UI 디자인 변경                              |
| **Comment**   | 필요한 주석 추가 및 변경                                   |
| **Style**     | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우         |
| **Test**      | 테스트 코드 추가, 수정, 삭제, 비즈니스 로직에 변경이 없는 경우 |
| **Chore**     | 기타 변경사항 (빌드 스크립트 수정, assets, 패키지 매니저 등) |
| **Init**      | 프로젝트 초기 생성                                         |
| **Rename**    | 파일 혹은 폴더명 수정하거나 옮기는 경우                   |
| **Remove**    | 파일을 삭제하는 작업만 수행하는 경우                       |
