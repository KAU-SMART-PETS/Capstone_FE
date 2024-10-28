// routes.ts

import React from 'react';

import BoxExample from '@screens/BoxExample';
import BadgeExample from '@screens/BadgeExample';
import ModalExample from '@screens/ModalExample';
import TextInputExample from '@screens/TextInputExample';
import TestingPage from '@screens/TestingPage';
import RadioButtonExample from '@screens/RadioButtonExample';
import ListCardExample from '@screens/ListCardExample';
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
