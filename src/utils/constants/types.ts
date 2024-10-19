// types.ts
import { TextStyle, StyleProp } from 'react-native';

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

// 각 페이지 관련 매개변수타입
export type RootStackParamList = {
    Splash: undefined;
    MainTab: undefined;
    Home: undefined;
    Login: undefined;
    EditProfile: undefined;
    MyPage: undefined;
    PetRegister: undefined;
    PetProfile: undefined;
    Analysis: undefined;
    DiseaseDetail: {        // Params for DiseaseDetail
        disease: Disease;
        petName: string;
        diseaseDetail: DiseaseDetails;
    };
    RegisterHealthInfo: undefined;
    CameraView: undefined;
    HospitalList: undefined;
    SelectPart: undefined;
    BTView: undefined;
    WeeklySummary: WeeklySummaryProps;
    Example: undefined;
};

export type TextProps = {
  type: 'header1' | 'header2' | 'body1' | 'body2' | 'caption';
  children: React.ReactNode;
  customStyle?: StyleProp<TextStyle>; // Updated to use StyleProp<TextStyle>
};

// Define the props for the HeaderText component
export interface HeaderTextProps {
  text: string;
  highlight: string;
}


