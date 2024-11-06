import React from 'react';
import { View } from 'react-native';
import StylizedText from '@common/StylizedText';

type Preset = 'default' | 'walkRecord' | 'iconLabel' | 'caution';

interface RecordField {
  label?: React.ReactNode;
  value?: React.ReactNode;
}

interface RecordSectionProps {
  title?: string;
  titleIcon?: React.ReactNode;
  fields: RecordField[];
  badge?: React.ReactNode;
  footerText?: React.ReactNode;
  preset?: Preset;
  rowFlex?: boolean;
  labelWidth?: string;
  valueWidth?: string;
}

const baseStyles = {
  container: 'p-5 bg-white rounded-lg shadow',
  titleType: 'header1',
  titleClass: 'text-black',
  titleSpacing: 'mb-8',
  labelType: 'body1',
  labelClass: 'text-black',
  valueType: 'body1',
  valueClass: 'text-black',
  rowSpacing: 'space-y-4',
};

const presetStyles: Record<Preset, Partial<typeof baseStyles>> = {
  default: {},
  iconLabel: { container: 'p-6 bg-white', rowSpacing: 'space-y-2' },
  walkRecord: { container: 'p-8 bg-white', labelType: 'record1', valueType: 'record2', rowSpacing: 'space-y-6' },
  caution: {
    container: 'p-8',
    titleType: 'caption-title',
    titleSpacing: 'mb-1',
    titleClass: 'text-black/50',
    labelType: 'caption-label',
    labelClass: 'ml-1 w-3/5 text-black/50 flex-wrap',
    rowSpacing: 'space-y-1',
  },
};

const getStyles = (preset: Preset) => ({
  ...baseStyles,
  ...presetStyles[preset],
});

const RecordSection: React.FC<RecordSectionProps> = ({
  title,
  titleIcon,
  fields,
  badge,
  footerText,
  preset = 'default',
  rowFlex = false,
  labelWidth = 'w-1/3',
  valueWidth = 'w-2/3',
}) => {
  const styles = getStyles(preset);
  const rowLayoutClass = rowFlex ? 'flex-col' : 'flex-row items-center';

  return (
    <View className={styles.container}>
      {/* Header */}
      {title && (
        <View className={`flex-row justify-between items-center ${styles.titleSpacing}`}>
          <View className="flex-row items-center">
            {titleIcon && <View className="mr-2">{titleIcon}</View>}
            <StylizedText type={styles.titleType} styleClass={styles.titleClass}>
              {title}
            </StylizedText>
          </View>
          {badge}
        </View>
      )}

      {/* Fields */}
      <View className={styles.rowSpacing}>
        {fields.map((field, index) => (
          <View key={index} className={`flex ${rowLayoutClass}`}>
            {field.label && (
              <View className={!rowFlex ? labelWidth : undefined}>
                {typeof field.label === 'string' ? (
                  <StylizedText type={styles.labelType} styleClass={styles.labelClass}>
                    {field.label}
                  </StylizedText>
                ) : (
                  field.label
                )}
              </View>
            )}
            <View className={!rowFlex ? valueWidth : undefined}>
              <StylizedText type={styles.valueType} styleClass={styles.valueClass}>
                {field.value}
              </StylizedText>
            </View>
          </View>
        ))}
      </View>

      {/* Footer */}
      {footerText && (
        <View className="mt-3">
          <StylizedText type="body2" styleClass="text-secondary mt-1">
            {footerText}
          </StylizedText>
        </View>
      )}
    </View>
  );
};

export default RecordSection;
