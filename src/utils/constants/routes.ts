// routes.ts

import React from 'react';


import TestingPage from '@screens/TestingPage';
import BluetoothScanner from '@screens/bluetooth/BluetoothScanner';

export type RouteEntry<ComponentProps = undefined> = {
  component: React.ComponentType<any>;
  params: ComponentProps;
};

export const routesConfig: {
  [key: string]: RouteEntry<any>;
} = {
  TestingPage: { component: TestingPage, params: undefined },
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
