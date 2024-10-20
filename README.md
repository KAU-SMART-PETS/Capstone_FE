# 코드 통합 관련 주요 변경사항 (+ 리팩토링)

> 작성자(담당자) : 남서아 Wendy-Nam

## 디렉토리 구조

### `src` 디렉토리 아래 주요 파일 및 폴더:

- `**App**`: 메인 엔트리 파일

- `**navigation**`: 내비게이션 관련 설정 파일


### `src` 아래 주요 폴더:

1. `**Api**`: API 및 더미 데이터

2. `**Assets**`: 폰트, 이미지, SVG 파일 저장소

3. `**Components**`: 재사용 가능한 UI 컴포넌트

4. `**Screens**`: 화면 컴포넌트

5. `**Utils**`: 상수, 타입, 보조 함수

---

## API: JSON 파일 및 더미 데이터 사용

### 1. 더미 데이터 위치 및 용도

- **더미 데이터 경로**: `api/data/`
- **구조화 방법**: 프로젝트 실행 시 `merge-json.ts`로 여러 json 파일을 병합하여 `db.json` 생성.

  ```json
  {
    "points": {
      "id": 1,
      "value": "some data"
    }
  }
   ```

- 예: points.json 파일의 데이터는 /points 경로에서 호출 가능.

- 서버 경로 설정: 실제 서버 URL과 맞춰서 호출 경로를 구성해야 함.
   
   - 예: `localhost:8080/api/v1/points` 로 서버를 호출 가능.
   
   - 이를 위해 json-server 버전 다운그레이드 및 `--routes` 옵션 사용하고자 했으나, 라이브러리 이슈로 다른 버전 재설치 및 테스트 예정 (`api/routes/routes.json` 내용 참고)


### 2. API 호출 설정

- API 기본 URL은 `utils/constants/config.ts` 파일에서 설정.

   ```ts
   import config from '@constants/config';

   axios.get(`${config.API_BASE_URL}/api/v1/points`);
   ```

### 3. API 테스트 방법

- 서버 실행: `yarn start:api`로 API 서버 시작.
- 테스트 명령어: 다음과 같은 명령어로 API 데이터 확인 가능.

   ```bash
   $ curl http://localhost:8080/api/v1/pets/1
   ```

### 4. 서버 API 관련 파일들 (.ts)

- 파일 경로: `src/api/`
- 구현 예시:

   ```ts
   import Pet1 from '@data/pets1.json';

   // 반려동물 정보 조회 함수
   export const fetchPetInfo = async (petId: number) => {
   return Pet1;
   };
   ```

### 5. 주의사항

- json-server 설치: json-server의 특정 버전으로 재설치하여 CORS 문제와 경로 설정을 해결해야 함.

- json 파일 스키마 확인: 각 json 파일의 스키마가 서버와 일관되게 맞춰져 있는지 재검토 필요.

## ASSETS

- 폰트: Pretendard 사용 (`assets/fonts/`).
   
   - `react-native.config.js`를 통해 연결.

   - 스타일 예시

      ```js
      fontFamily: 'Pretendard-Bold';
      ```
   
- 이미지 사용법: 간편 경로로 이미지 호출 가능.
   
   - 예 : `import bootSplashLogo from '@image/bootsplash/bootsplash_logo.png';`

   - **주의사항**: `require()` 대신 이미지의 `source` 속성에 바로 넣어 사용.

      ```tsx
      <Image source={bootSplashLogo} />
      ```

## COMPONENTS

### 주요 컴포넌트 설명 (@components/commons/)

- `RoundedBox`: 다양한 버튼 및 프레임 제공. (핵심 UI 컨테이너)

   - 테마 옵션:
      A: 하얀 프레임
      B: 회색 무테 프레임
      C: 아이콘/사진 or 텍스트 정사각형 버튼 (중앙 배치)

      ```tsx
      <RoundedBox>
         <Text>Button Text</Text> // 그 이외 다른 컴포넌트 넣을 수도 있음
         </RoundedBox>
      ```
   - 해당 컴포넌트 파일에 `RoundedFrame`, `RoundedTextButton`, `RoundedCircleButton` 등 컴포넌트 존재
      
      - shadow 옵션은 대부분의 컴포넌트에 존재
      
      - RoundedBox는 button/frame 선택 옵션 또한 가짐
      - RoundedBox에는 모서리 끝에 올라가는 pill-badge 추가옵션 존재

      - 커스텀 옵션에 대해서 인자 외에도, `src/utils/constants`에 위치하는 `types.ts` 파일의 하단도 참고할 수 있음.

- `StylizedText` : 텍스트 스타일링 담당. `Tailwind` 스타일 형식으로 색상옵션 입력 (예: `text-blue-300`).

      ```tsx
      <StylizedText color="text-blue-300" type="header1">
         안녕하세요
      </StylizedText>
      ```

   - StylizedText 코드 하단에 `header1, header2 ... ` 등 여러 속성이 정의되어있으며 세부 디자인 수정가능.

- `HeaderText` : 화면 최상단에 자주 등장하는 제목텍스트를 위한 것

   - 하이라이트 단어(애견이름, 회원이름 등)를 primary color로 표시

   - StylizedText와 같은 파일에 존재
      
      ```tsx
      <HeaderText
            text={${petName}의 일주일은 어땠을까요?}  // petName 사용
            highlight={petName || ''}                // 강조할 부분
         />

      ```


- `ShadowBox`: 안드로이드용 그림자 효과를 최대한 피그마와 일치하게 구현. (외부 라이브러리 사용)

   ```tsx
   <ShadowBox>
      <Text>그림자 효과</Text>
   </ShadowBox>
   ```

   - (참고) `RoundedBox`의 아이템들은 그림자 옵션에서 이 컴포넌트를 wrapper 컨테이너로 활용.

### 기타 컴포넌트

- `BarChart`: 가로 및 세로 막대 그래프 제공. (VBar, HBar..)

- `ColorMap`: 프로젝트 전반에서 사용되는 색상 관리.

- **삭제 예정** : 범용성이 적어 삭제 또는 다른 컴포넌트에 통합 예정.
   - `CircularButton`, `DiseaseCard`, `SquareRoundedBox`

- **작업 예정** : 다른 팀원의 코드에서 추가됨.

   - `CustomImagePicker`, `CustomTextInput`

      - 이슈 해결 진행 중

   - `Avatar`, `Badge`, `Loading`

      - 머지 이후 간단한 컴포넌트로 추가 예정


## SCREENS

### 화면 구성

- `Screens/` 폴더는 `health`, `bluetooth`, `home`, `profile`, `walk`로 분류.

- 파일명 조정: 화면 컴포넌트 이름과 파일명이 일치하도록 통일함.

   - 이전에는 파일명과 컴포넌트명이 관련성이 적어 헷갈리기 쉬웠음

   - 파일명의 길이 문제로 Screen 접두사를 제외함.


### 작업 진행상태

- 프로젝트 파일 재구성, 호출구조 재정의

- 서버 api 프로토타입 작성 (테스트 미완료)

- json-server api환경 구성 및 관련 테스팅 스크립트 추가

- 기존 코드 로직 리팩토링 (반복되는 코드 최소화, 하드코딩 대신 변수-상위객체와의 연결 )

- 컴포넌트화 및 api 연동 설계 (`WeeklySummary`) 

- 현재 이슈:

   - Walk 관련: `PetCalendar`, `WalkTimer`, `TodayWalk` 등의 작업이 미완성 상태.

      - expo 관련 라이브러리 대체로 인한 추가 이슈 (cli 환경과의 통합을 위해)

      - 합쳐야할 코드가, 모든 UI요소에 대해 전부 개별적인 스타일이 적용되어 있음
         
         - 각 스크린에서, 컴포넌트의 모든 부분에 고유한 스타일링이 적용된 상태. (+ 스크린 별로 스타일시트 존재)
      
         - 현재 스타일의 적용을 위해, 스타일 재설계 및 코드 새로 작성 중.

         - 코드 재구조화 시, 데이터 및 api와 연결을 고려하여 api 관련 코드 추가 중.

## UTILS

- 상수 및 설정 파일 위치: 모든 상수는 utils/constants/에서 관리.

- 타입 관리: utils/constants/types.ts에서 프로젝트 전반에서 사용할 타입을 정의.

   ```ts
   import { SomeType } from '@types';
   ```

### 주요 파일

- `config.ts`: API 기본 URL 등 주요 설정값 저장.
- `types.ts`: 타입 정의 모음.


# 추가 공지 및 유의사항

- `Tailwind 경로`: 파일 경로 변동에 스타일링 속성이 큰 영향을 받는다면, `tailwind.config.js`의 src 경로를 검토해볼 것.

- `API 테스트 필수`: 서버 API 스키마에 맞춘 코드가 정확하게 작동하는지 테스트가 필요함.

   - 현재 작성된 api 함수 이용 시, dummyJson의 스키마 타입과 함수의 api호출을 검토해 볼 것 

   - 화면과 데이터가 분리된 구조를 위해, 1차적으로 json파일 자체를 리턴하도록 하여 사용 가능.

      ```
      import Pet1 from '@data/pets1.json';

      // 반려동물 정보 조회
      export const fetchPetInfo = async (petId: number) => {
         return Pet1;
      };

      ```
- `경로 alias 사용`: 프로젝트 경로 관리를 쉽게 하기 위해 alias를 적극적으로 활용 중.

   - Alias 설정 목록

      1. **`@api`**: `./src/api`
      2. **`@data`**: `./src/api/data`
      3. **`@components`**: `./src/components`
      4. **`@screens`**: `./src/screens`
      5. **`@constants`**: `./src/utils/constants`
      6. **`@types`**: `./src/utils/constants/types`
      7. **`@image`**: `./src/assets/image`

      *추가가 필요한 경우 위 형식에 맞게 alias를 계속 확장 가능.*
   
   - `babel.config.js`와 `tsconfig.json`의 목록을 업데이트하여, 간편경로 정의 및 사용 가능

