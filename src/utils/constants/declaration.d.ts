import 'react-native';

// 모든 주요 React Native 컴포넌트에 className prop 추가
declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }

  interface TextProps {
    className?: string;
  }

  interface ImageProps {
    className?: string;
  }

  interface ScrollViewProps {
    className?: string;
  }

  interface FlatListProps<ItemT> {
    className?: string;
    data: ItemT[];
    renderItem: (item: ItemT) => JSX.Element;
  }

  interface SectionListProps<ItemT> {
    className?: string;
    data: ItemT[];
    renderItem: (item: ItemT) => JSX.Element;
  }

  interface TouchableOpacityProps {
    className?: string;
  }

  interface TouchableWithoutFeedbackProps {
    className?: string;
  }

  interface TouchableHighlightProps {
    className?: string;
  }
}
