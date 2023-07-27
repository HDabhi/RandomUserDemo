import React, { ReactNode } from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';

import colors from '../utils/colors';

type TextType = 'large' | 'medium' | 'small';

interface CustomTextProps {
  type?: TextType;
  style?: StyleProp<TextStyle>;
  title: ReactNode;
}

const CustomText: React.FC<CustomTextProps> = (props) => {
  const { type = "small", style, title } = props;

  const getTextStyle = () => {
    switch (type) {
      case 'large':
        return styles.large;
      case 'medium':
        return styles.medium;
      case 'small':
        return styles.small;
      default:
        return styles.small;
    }
  };

  return <Text style={[getTextStyle(), style]}>{title}</Text>;
};

export default CustomText;

const styles = StyleSheet.create({
  large: {
    fontSize: 16,
    paddingVertical: 1,
    color: colors.BLACK,
  },
  medium: {
    fontSize: 14,
    paddingVertical: 1,
    color: colors.BLACK,
  },
  small: {
    fontSize: 12,
    paddingVertical: 1,
    color: colors.BLACK,
  },
});
