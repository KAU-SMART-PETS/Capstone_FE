// routes.ts

import React from 'react';
import { ImageSourcePropType } from 'react-native';
import {PetData, PetDetails, PetAIData} from '@constants/types';

// Home
import MainTab from '@screens/home/MainTab';
import Home from '@screens/home/Home';
import Splash from '@screens/home/Splash';

// Profile
import Login from '@screens/profile/Login';
import EditProfile from '@screens/profile/EditProfile';
import MyPage from '@screens/profile/MyPage';
import PetRegister from '@screens/profile/PetRegister';
import PetProfile from '@screens/profile/PetProfile';
// Health
import Analysis from '@screens/health/Analysis';
import HospitalList from '@screens/health/HospitalList';
import CameraView from '@src/screens/ai/CameraView';
import RegisterHealthInfo from '@screens/health/RegisterHealthInfo';
import DiseaseDetail from '@screens/health/DiseaseDetail';
import HospitalInfo from '@src/screens/health/HospitalInfo';
import PetUpdate from '@src/screens/profile/PetUpdate';
// Walk
import WeeklySummary from '@screens/walk/WeeklySummary';
import WalkStartPage from '@screens/walk/WalkStartPage'
import MapPage from '@screens/walk/MapPage'
import WalkRecord from '@screens/walk/WalkRecord'
import WalkWeeklyRecord from '@src/screens/walk/WalkWeeklyRecord';
import RecordStartPage from '@src/screens/walk/RecordStartPage';
//import RecordStartPage from '@src/screens/walk/RecordStartPage';

// Bluetooth
import BTView from '@screens/bluetooth/BTView';


// Reward & Point & Food(Feed)
import ChallengeList from '@screens/reward/ChallengeList';
import CongratulatePopUp from '@screens/reward/CongratulatePopUp';

import OrderReceived from '@screens/feed/OrderReceived';
import { OrderReceivedParams } from '@screens/feed/OrderReceived';
import ViewFeedList from '@screens/feed/ViewFeedList';
import PaymentInformation from '@screens/feed/PaymentInformation';
import PaymentSampleInformation from '@screens/feed/PaymentSampleInformation';
import SearchAddress from '@screens/feed/SearchAddress';

// Ai
import SelectPetToScan from '@screens/ai/SelectPetToScan';
import AlertScan from '@src/screens/ai/AlertScan';
import ScanPetResult from '@src/screens/ai/ScanPetResult';
// Ai 결과 화면
import ResultEyeScan from '@screens/ai/ResultEyeScan';
import ResultNoseRegister from '@screens/ai/ResultNoseRegister';
import ResultNoseScan from '@screens/ai/ResultNoseScan'; // 이미 등록된 비문과 사진 비교
import ResultOwnerDetails from '@screens/ai/ResultOwnerDetails';

//System
import Offline from '@screens/system/Offline';

export type RouteEntry<ComponentProps = undefined> = {
  component: React.ComponentType<any>;
  params?: ComponentProps;
};

type AddressParams = {
  zonecode?: string;
  address?: string;
  defaultAddress?: string;
};

export const routesConfig: {
  [key: string]: RouteEntry<any>;
} & {
  RegisterHealthInfo: RouteEntry<{ id: number }>;
  PetProfile: RouteEntry<{id: string}>; // 주의!
  PetUpdate: RouteEntry<{id: string, data: PetDetails}>;
  OrderReceived: RouteEntry<OrderReceivedParams>;
  SelectPetToScan: RouteEntry<{scanType: string}>;
  AlertScan: RouteEntry<{scanType: string, petId: string, petType: string, petName: string}>;
  ScanPetResult: RouteEntry<{scanType: string, imageUri: string, petId: string, petType: string, petName: string}>;
} = {
  MainTab: { component: MainTab, params: undefined },
  Login: { component: Login, params: undefined },
  EditProfile: { component: EditProfile, params: undefined },
  MyPage: { component: MyPage, params: undefined },
  PetRegister: { component: PetRegister, params: undefined },
  PetProfile: {
    component: PetProfile,
    params: { id : "" }
  }, // PetProfile에 필요한 params 설정
  Analysis: { component: Analysis, params: undefined },
  HospitalList: { component: HospitalList, params: undefined },
  CameraView: { component: CameraView, params: {onPhotoTaken : (photoUri: string) => {}} },
  RegisterHealthInfo: { component: RegisterHealthInfo, params: { id: 0 } }, // id를 number로 설정
  DiseaseDetail: { component: DiseaseDetail, params: undefined },
  HospitalInfo: {component: HospitalInfo, params: undefined},
  PetUpdate: { component: PetUpdate, params: undefined },
  // AI
  SelectPetToScan: { component: SelectPetToScan, params: {scanType : 'EYE_SCAN'} },
  AlertScan: { component: AlertScan, params: undefined },
  ScanPetResult: { component: ScanPetResult, params: undefined },
  ResultEyeScan: { component: ResultEyeScan, params: undefined },
  ResultNoseRegister: { component: ResultNoseRegister, params: undefined },
  ResultNoseScan: {component: ResultNoseScan, params: undefined},
  ResultOwnerDetails: {component: ResultOwnerDetails, params: undefined},
  Offline: {component: Offline, params: undefined},
  // reward pages
  ChallengeList :  { component: ChallengeList, params: undefined },
  CongratulatePopUp: { component: CongratulatePopUp, params: { rewardId: 0 } as CongratulatePopUpParams },
  OrderReceived: { component: OrderReceived, params: { product: '' } },
  ViewFeedList :  { component: ViewFeedList, params: undefined },
  PaymentInformation: { 
    component: PaymentInformation, 
    params: {} as AddressParams, // 타입 적용
  },
  PaymentSampleInformation: { 
    component: PaymentSampleInformation, 
    params: {} as AddressParams, // 타입 적용
  },
  SearchAddress :  { component: SearchAddress,  params: { returnTo: '' } },

  Home :  { component: Home, params: undefined },
   //산책 기능 관련 테스트 페이지
   WalkStartPage: {component:WalkStartPage, params:undefined},
   MapPage: {component:MapPage, params:undefined},
  //RecordStartPage: { component: RecordStartPage, params: undefined },
   WalkRecord: {component:WalkRecord, params:undefined},
   WalkWeeklyRecord: {component:WalkWeeklyRecord, params:undefined},
   RecordStartPage: {component:RecordStartPage, params: undefined},
  // WeeklySummary: {component:WeeklySummary, params: { petId: 1 } },
};

export const typedObjectEntries = <T extends object>(obj: T): [keyof T, T[keyof T]][] => {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
};

export const routeComponents = Object.keys(routesConfig).reduce((acc, key) => {
  const routeKey = key as keyof typeof routesConfig;
  acc[routeKey] = routesConfig[routeKey].component;
  return acc;
}, {} as { [K in keyof typeof routesConfig]: typeof routesConfig[K]['component'] });


export type RootStackParamList = {
  [K in keyof typeof routesConfig]: typeof routesConfig[K]['params'];
};