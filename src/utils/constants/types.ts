// types.ts

// health:AnalysisScreen

export interface Disease {
  name: string;
  probability: number;
}

export interface DiseaseDetails {
  about: string;
  note: string;
  goodFood: string;
  badFood: string;
}

export interface PetData {
  name: string;
  type: string;
  age: string;
  sex: string;
  diseases: Disease[];
}

// 타입 정의
export interface PetRegistRequest {
  name: string;
  petType: number;
  gender: number;
  weight: number;
  age: number;
  image: string;
}

export interface PetInfoResponse {
  name: string;
  petType: string; // "CAT" or "DOG"
  gender: string; // "MALE" or "FEMALE"
  weight: number;
  imageUrl: string;
  age: number;
}

export interface PetDetails {
  id: string;
  name: string;
  petType: 'CAT' | 'DOG';
  gender: 'MALE' | 'FEMALE';
  weight: number;
  imageUrl: string | null;
  age: number;
}

// WeeklyData
export interface Metrics {
  walk: number;
  rest: number;
  steps: number;
  sunlight: number;
  uvExposure: number;
  vitaminD: number;
}

export interface WeeklyDataType {
  date: string; // 날짜
  metrics: Metrics; // 메트릭스
}

export interface WeeklySummaryProps {
  petId: number;
}

export interface UserData{
  name: string;
  email: string;
  phoneNumber: string;
  point: number;
  socialSite: string;
  smsOptIn: boolean;
  emailOptIn: boolean;
}
// // 각 페이지 관련 매개변수타입
// export type RootStackParamList = {
//     MainTab: undefined;
//     Home: undefined;
//     Login: undefined;
//     EditProfile: undefined;
//     MyPage: undefined;
//     PetRegister: undefined;
//     PetProfile: PetDetails;
//     Analysis: undefined;
//     DiseaseDetail: {        // Params for DiseaseDetail
//         disease: Disease;
//         petName: string;
//         diseaseDetail: DiseaseDetails;
//     };
//     RegisterHealthInfo: string;
//     CameraView: undefined;
//     HospitalList: undefined;
//     SelectPart: undefined;
//     BTView: undefined;
//     WeeklySummary: WeeklySummaryProps;
//     TodayWalk: WeeklySummaryProps;
//     Example: undefined;
// };

// 
// COMPONENTS
//
export type TextProps = {
  type: 'header1' | 'header2' | 'body1' | 'body2' | 'caption';
  color?: string,
  children: React.ReactNode;
};

// Define the props for the HeaderText component
export interface HeaderTextProps {
  text: string;
  highlight: string;
}

export type DesignPreset = 'A' | 'B' | 'C'; // Define preset options

export type RoundedFrameProps = {
  children: React.ReactNode; // Accepts any children components
  preset?: DesignPreset; // Optional design preset
  shadow?: boolean; // Option for shadow
};

export type RoundedBoxProps = {
  children: React.ReactNode;
  preset?: DesignPreset; // Preset options
  badgeText?: string;
  badgeColor?: string;
  shadow?: boolean; // Option for shadow
  onPress?: () => void; // Function to call on press
  isButton?: boolean; // Default is not a button
  onSelect?: (isSelected: boolean) => void; // Callback to return selection state
  borderActivate?: boolean; // Option to activate border styling
};

export type TagBadgeProps = {
  color?: string;
  content?: string;
};

export type ButtonColor = 'bg-grey' | 'bg-primary' | 'bg-white' | 'bg-black'; // Define preset options

export type RoundedTextButtonProps = {
  color?: ButtonColor;
  textColor?: string;
  textType?: string;
  content: string; // Content is a string for text button
  borderRadius?: string;
  shadow?: boolean;
  widthOption?: 'full' | 'sm' | 'md' | 'lg';
  onPress: () => void; // Function to handle press
};

export type RoundedCircleButtonProps = {
  color?: string;
  borderRadius?: string;
  shadow?: boolean;
  size?: number;
  children: React.ReactNode; // Accepts any React component as children
  onPress: () => void; // Function to handle press
};
