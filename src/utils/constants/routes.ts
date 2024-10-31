// routes.ts

import React from 'react';

import BoxExample from '@screens/BoxExample';
import BadgeExample from '@screens/BadgeExample';
import ModalExample from '@screens/ModalExample';
import TextInputExample from '@screens/TextInputExample';
import TestingPage from '@screens/TestingPage';
import RadioButtonExample from '@screens/RadioButtonExample';
import ListCardExample from '@screens/ListCardExample';
import AchievementCardExample from '@screens/AchievementCardExample';
import ICWExample from '@screens/ICWExample';
import BalloonBoxExample from '@screens/BallonBoxExample';
import RecordExample from '@screens/RecordExample';
import WalkStartPage from '@screens/walk/WalkStartPage';
import MapPage from '@screens/walk/MapPage';

// import SummaryExample from '@screens/SummaryExample';
// import BlueToothScanner from '@screens/BlueToothScanner';


export type RouteEntry<ComponentProps = undefined> = {
  component: React.ComponentType<any>;
  params: ComponentProps;
};

export const routesConfig: {
  [key: string]: RouteEntry<any>;
} = {
  BoxExample: { component: BoxExample, params: undefined },
  BadgeExample: { component: BadgeExample, params: undefined },
  ModalExample: { component: ModalExample, params: undefined },
  TextInputExample: { component: TextInputExample, params: undefined },
  TestingPage: { component: TestingPage, params: undefined },
  RadioButtonExample: { component: RadioButtonExample, params: undefined },
  ListCardExample: { component: ListCardExample, params: undefined },
  AchievementCardExample :  { component: AchievementCardExample, params: undefined },
  ICWExample :  { component: ICWExample, params: undefined },
  BalloonBoxExample :  { component: BalloonBoxExample, params: undefined },
  RecordExample  :  { component: RecordExample, params: undefined },
  WalkStartPage :  { component: WalkStartPage, params: undefined },
  MapPage :  { component: MapPage, params: undefined },
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
