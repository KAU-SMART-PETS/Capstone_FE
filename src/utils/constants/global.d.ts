/// <reference types="nativewind/types" />

declare global {
    namespace JSX {
      interface IntrinsicAttributes {
        className?: string; // 모든 컴포넌트에 className 추가
      }
    }
}