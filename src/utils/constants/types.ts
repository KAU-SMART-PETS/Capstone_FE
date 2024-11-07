// types.ts

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

// 블루투스 정보

// src/types.ts

export interface LoginInfo {
  authToken: string;
}

export interface BluetoothRegistryRequest {
  deviceName: string;
  deviceId: string;
  macAddress: string;
}

export interface BluetoothRegistryResponse {
  success: boolean;
  message?: string;
  // 기타 필요한 필드
}

export interface OwnedBluetoothResponse {
  success: boolean;
  devices: OwnedBluetoothDevice[];
}

export interface OwnedBluetoothDevice {
  id: string;
  name: string;
  macAddress: string;
  status: 'connected' | 'connecting' | 'disconnected';
}

export interface DetectionInfo {
  deviceId: string;
  timestamp: string;
}
