import React from 'react';
import {StyleSheet, View} from 'react-native';

const ItemSeparatorComponent = () => {
  return (
    <View
      style={styles.view}
    />
  );
};

const styles = StyleSheet.create({
  view: {
    height: 1,
    backgroundColor: 'gray',
    marginHorizontal: 8,
  },
});

export default ItemSeparatorComponent;
