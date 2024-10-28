/// <reference types="nativewind/types" />
import { RootStackParamList as AppRootStackParamList } from '@constants/routes';
import { routeComponents as AppRouteComponents } from '@constants/routes';
import { typedObjectEntries as appTypedObjectEntries } from '@constants/routes';


declare global {
    namespace JSX {
      interface IntrinsicAttributes {
        className?: string; // 모든 컴포넌트에 className 추가
      }
    }
}

declare global {
  type RootStackParamList = AppRootStackParamList;
}
