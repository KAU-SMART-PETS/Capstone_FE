/***************************************************************************************
 * @components/commons 사용 가이드
 *
 * 1. UI요소 추가 및 스타일링 시, @components/commons 안쪽의 컴포넌트를 우선적으로 쓰는 것을 권장
 * 2. 내부 레이아웃이나 스타일 조정이 필요할 경우, 아래의 Tailwind 링크를 참조:
 *    - Tailwind CSS Docs: https://tailwindcss.com/docs/justify-content
 *
 ****************************************************************************************/

/****************************************************************************************
 * React Native용 네이티브 윈드 스타일링
 *
 * 1. 현재 프로젝트는 React Native 환경에서 네이티브 윈드를 사용 중. (테일윈드의 RN 버전)
 * 2. 모바일 레이아웃 속성에 관해서는, 테일윈드 이에도 아래의 네이티브 윈드 문서를 참고 가능:
 *    - Native Wind Flexbox: https://www.nativewind.dev/tailwind/flexbox/flex-basis
 ****************************************************************************************/

/****************************************************************************************
 * 스크린 추가 시 RootStackParams 업데이트 안내
 *
 * - 스크린 추가할 때마다, ./utils/constants/types.ts에 있는 RootStackParams 리스트에 내용을 추가하면 됨.
 * - 페이지는 'undefined' 타입으로 추가할 것.
 *
 * 예시)
 * export type RootStackParamList = {
 *    Example: undefined;
 *    Example2: undefined;
 *    MainPage: undefined;
 * };
 ****************************************************************************************/

/****************************************************************************************
 * 컴포넌트와 이미지 import 및 사용법
 *
 * - 컴포넌트와 이미지는 아래와 같이 import 가능함.
 *    import StylizedText from '@components/common/StylizedText';
 *    import AvatarPlaceholder from '@image/placeholder/dog.jpg';
 * 
 * - 사용 예시:
 *    <StylizedText type="body1" styleClass="text-orange">Option1</StylizedText>
 *    <Image source={AvatarPlaceholder}/>
 *
 * - 추가적인 커스텀 옵션은 component 파일 내 인자를 확인하면 됨.
 *    인자의 종류(예: 색상 등)에 제한이 있을 수 있으니, types 파일도 함께 참고할 것.
 ****************************************************************************************/

/****************************************************************************************
 * 컴포넌트의 정의된 타입 예시 - utils/constants/types.ts
 *
 * - 버튼 색상 등 제한된 옵션 정의:
 *    export type ButtonColor = 'bg-grey' | 'bg-primary' | 'bg-white' | 'bg-black';
 * 
 * - RoundedTextButtonProps 예시:
 *    export type RoundedTextButtonProps = {
 *       color?: ButtonColor;
 *       textColor?: string;
 *       textType?: string;
 *       content: string;
 *       borderRadius?: string;
 *       shadow?: boolean;
 *       widthOption?: 'full' | 'sm' | 'md' | 'lg';
 *       onPress: () => void;
 *    };
 * 
 * - 컴포넌트의 커스텀 스타일링 시 참고할 것
 * 
 ****************************************************************************************/

/****************************************************************************************
 * 간편 경로 Alias 설정
 *
 * - 모듈 import 시 아래의 간편경로를 사용 가능함:
 *    '@api': './src/api',
 *    '@data': './src/api/data',
 *    '@components': './src/components',
 *    '@screens': './src/screens',
 *    '@constants': './src/utils/constants',
 *    '@types': './src/utils/constants/types',
 *    '@image': './src/assets/image',
 *
 * - 상대경로처럼 현재 위치에서 . 또는 .. 를 사용할 필요 없이 어디서든 편리하게 모듈을 가져올 수 있음.
 ****************************************************************************************/
