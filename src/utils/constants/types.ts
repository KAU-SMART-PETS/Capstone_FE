// types.ts

// 각 페이지 관련 매개변수타입
export type RootStackParamList = {
    BoxExample: undefined;
    BadgeExample: undefined;
    TextInputExample: undefined;
    ModalExample: undefined;
    TestingPage: undefined;
};

// 
// COMPONENTS
//




// 
// 
// API와 그 형식 관련
// 
// 

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
