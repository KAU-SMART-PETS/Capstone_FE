import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {ShadowStyle} from '@common/ShadowBox';
import { getBoxOutlnes, getBoxStyles, OutlinePreset, DesignPreset } from '@common/BoxStyles';

export type { DesignPreset, OutlinePreset };

export type RoundedBoxProps = {
  children: React.ReactNode;
  preset?: DesignPreset; // Preset options
  shadow?: boolean; // Option for shadow
  onPress?: () => void; // Function to call on press
  outline?: OutlinePreset;
};

const RoundedBox: React.FC<RoundedBoxProps> = ({
  children,
  preset = 'A',
  shadow = true,
  onPress,
  outline = 'solid'
}) => {
  const styles = getBoxStyles(preset);
  const outlines = getBoxOutlnes(outline);

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container onPress={onPress} style={[outlines, shadow && ShadowStyle]} className={`${styles.containerLayout} ${styles.backgroundColor} ${styles.borderStyle}`}>
      {children}
    </Container>
  );
};

export default RoundedBox;
