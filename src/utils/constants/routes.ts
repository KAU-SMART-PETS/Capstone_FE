// routes.ts

import React from 'react';


import TestingPage from '@screens/TestingPage';
// cards
import BoxExample from '@example/cards/BoxExample';
import ModalExample from '@example/cards/ModalExample';
import ListCardExample from '@example/cards/ListCardExample';
// inputs
import TextInputExample from '@example/inputs/TextInputExample';
import RadioButtonExample from '@example/inputs/RadioButtonExample';
import ButtonExample from '@example/inputs/ButtonExample';
// frames
import BadgeExample from '@example/frames/BadgeExample';
import BalloonBoxExample from '@example/frames/BallonBoxExample';
// sections
import BannerExample from '@example/sections/BannerExample';
import BarChartExample from '@example/sections/BarChartExample';
import RecordExample from '@example/sections/RecordExample';
import CalendarExample from '@example/sections/CalendarExample';
import LoadingExample from '@example/sections/LoadingExample';

export type RouteEntry<ComponentProps = undefined> = {
  component: React.ComponentType<any>;
  params: ComponentProps;
};

export const routesConfig: {
  [key: string]: RouteEntry<any>;
} = {
  TestingPage: { component: TestingPage, params: undefined },
  // cards 
  BoxExample: { component: BoxExample, params: undefined },
  ModalExample: { component: ModalExample, params: undefined },
  ListCardExample: { component: ListCardExample, params: undefined },
  // inputs
  TextInputExample: { component: TextInputExample, params: undefined },
  RadioButtonExample: { component: RadioButtonExample, params: undefined },
  ButtonExample: { component: ButtonExample, params: undefined },
  // frames
  BadgeExample: { component: BadgeExample, params: undefined },
  BalloonBoxExample: { component: BalloonBoxExample, params: undefined },
  // sections
  CalendarExample : { component: CalendarExample, params: undefined },
  BarChartExample :  { component: BarChartExample, params: undefined },
  BannerExample :  { component: BannerExample, params: undefined },
  RecordExample :  { component: RecordExample, params: undefined },
  LoadingExample :  { component: LoadingExample, params: undefined },
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
