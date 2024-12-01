// routes.ts

import React from 'react';
import {PetDetails} from '@constants/types';
import MainTab from '@components/layout/MainTab';

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
import CameraView from '@screens/health/CameraView';
import RegisterHealthInfo from '@screens/health/RegisterHealthInfo';
import DiseaseDetail from '@screens/health/DiseaseDetail';
import SelectPart from '@screens/health/SelectPart';
import HospitalInfo from '@src/screens/health/HospitalInfo';
import PetUpdate from '@src/screens/profile/PetUpdate';
// Walk
import WeeklySummary from '@screens/walk/WeeklySummary';
// import TodayWalk from '@screens/walk/TodayWalk';
import WalkStartPage from '@screens/walk/WalkStartPage'
import MapPage from '@screens/walk/MapPage'
import WalkRecord from '@screens/walk/WalkRecord'
import WalkWeeklyRecord from '@src/screens/walk/WalkWeeklyRecord';

// Bluetooth
import BTView from '@screens/bluetooth/BTView';

// Ai
import ReadyToScan from '@screens/ai/ReadyToScan';
import SelectPetToScan from '@screens/ai/SelectPetToScan';
import TakePicture from '@screens/ai/TakePicture';
import ResultEyeScan from '@screens/ai/ResultEyeScan';

// Reward & Point & Food(Feed)
import ChallengeList from '@screens/reward/ChallengeList';
import CongratulatePopUp from '@screens/reward/CongratulatePopUp';
import OrderReceived from '@screens/reward/OrderReceived';
import { OrderReceivedParams } from '@screens/reward/OrderReceived';
import ViewFeedList from '@screens/reward/ViewFeedList';
import PaymentInformation from '@screens/reward/PaymentInformation';
import PaymentSampleInformation from '@screens/reward/PaymentSampleInformation';

export type RouteEntry<ComponentProps = undefined> = {
  component: React.ComponentType<any>;
  params?: ComponentProps;
};

export const routesConfig: {
  [key: string]: RouteEntry<any>;
} & {
  RegisterHealthInfo: RouteEntry<{ id: number }>;
  PetProfile: RouteEntry<{pet?: PetDetails}>;
  OrderReceived: RouteEntry<OrderReceivedParams>;
} = {
  MainTab: { component: MainTab, params: undefined },
  Login: { component: Login, params: undefined },
  EditProfile: { component: EditProfile, params: undefined },
  MyPage: { component: MyPage, params: undefined },
  PetRegister: { component: PetRegister, params: undefined },
  PetProfile: { 
    component: PetProfile, 
    params: undefined ,
  }, // PetProfile에 필요한 params 설정
  Analysis: { component: Analysis, params: undefined },
  HospitalList: { component: HospitalList, params: undefined },
  CameraView: { component: CameraView, params: undefined },
  RegisterHealthInfo: { component: RegisterHealthInfo, params: { id: 0 } }, // id를 number로 설정
  DiseaseDetail: { component: DiseaseDetail, params: undefined },
  SelectPart: { component: SelectPart, params: undefined },
  HospitalInfo: {component: HospitalInfo, params: undefined},
  PetUpdate: { component: PetUpdate, params: { petId: '' } },
  SelectPetToScan: { component: SelectPetToScan, params: undefined },
  ReadyToScan: { component: ReadyToScan, params: undefined },
  TakePicture: { component: TakePicture, params: undefined },
  ResultEyeScan: { component: ResultEyeScan, params: undefined },
  // reward pages
  ChallengeList :  { component: ChallengeList, params: undefined },
  CongratulatePopUp: { component: CongratulatePopUp, params: { point: 0 } as CongratulatePopUpParams },
  OrderReceived: { component: OrderReceived, params: { product: '' } },
  ViewFeedList :  { component: ViewFeedList, params: undefined },
  PaymentInformation :  { component: PaymentInformation, params: undefined },
  PaymentSampleInformation :  { component: PaymentSampleInformation, params: undefined },
  MapPage :  { component: MapPage, params: undefined },
  Home :  { component: Home, params: undefined },
  //산책 기능 관련 테스트 페이지
  WalkStartPage: {component:WalkStartPage, params:undefined},
  WalkRecord: {component:WalkRecord, params:undefined},
  WalkWeeklyRecord: {component:WalkWeeklyRecord, params:undefined},
  WeeklySummary: {component:WeeklySummary, params: { petId: 1 } },
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