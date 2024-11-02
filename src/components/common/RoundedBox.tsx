import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import ShadowBox from '@common/ShadowBox';
import {getBoxOutlnes, getBoxStyles, OutlinePreset, DesignPreset} from '@common/BoxStyles';

export type { DesignPreset, OutlinePreset };

export type TagBadgeProps = {
  color?: string;
  content?: string;
};

export type RoundedFrameProps = {
  children: React.ReactNode; // Accepts any children components
  preset?: DesignPreset; // Optional design preset
  shadow?: boolean; // Option for shadow
  outline?: OutlinePreset;
};

export type RoundedBoxProps = {
  children: React.ReactNode;
  preset?: DesignPreset; // Preset options
  shadow?: boolean; // Option for shadow
  isButton?: boolean; // Default is not a button
  onPress?: () => void; // Function to call on press
  outline?: OutlinePreset;
};

export const RoundedFrame: React.FC<RoundedFrameProps> = ({
  children,
  preset = 'A',
  shadow = true,
  outline = 'solid'
}) => {
  const styles = getBoxStyles(preset);
  const outlines = getBoxOutlnes(outline);
  return (
    <View className='my-1'>
      {shadow ? (
          <ShadowBox style={outlines} className={`${styles.containerLayout} ${styles.backgroundColor} ${styles.borderStyle}`}>
            {children}
          </ShadowBox>
      ) : (
        <View style={outlines} className={`${styles.containerLayout} ${styles.backgroundColor} ${styles.borderStyle}`}>
          {children}
        </View>
      )}
    </View>
  );
};

export const RoundedBox: React.FC<RoundedBoxProps> = ({
  children,
  preset = 'A',
  shadow = true,
  onPress,
  isButton = false,
  outline='solid'
}) => {
  const Content = (
    <RoundedFrame
      preset={preset}
      shadow={shadow}
      outline={outline}
    >
      {children}
    </RoundedFrame>
  );

  return isButton ? (
    <TouchableOpacity onPress={onPress}>
      {Content}
    </TouchableOpacity>
  ) : (
    <View>{Content}</View>
  );
};

export default RoundedBox;
