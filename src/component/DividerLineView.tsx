import React from 'react';
import {StyleSheet, View} from 'react-native';

import colors from '../utils/colors';

const DividerLineView = () => {
  return <View style={styles.view} />;
};

const styles = StyleSheet.create({
  view: {height: 1, backgroundColor: colors.GRAY, width: '100%'},
});

export default DividerLineView;
