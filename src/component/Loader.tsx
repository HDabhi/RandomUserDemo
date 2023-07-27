import React from 'react';
import { View, Modal, ActivityIndicator, Text, StyleSheet } from 'react-native';
import colors from '../utils/colors';

interface LoaderProps {
  isLoading: boolean;
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ isLoading, message }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <Modal transparent visible={isLoading}>
      <View style={styles.modalContainer}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#000000" />
          {message && <Text style={styles.loaderMessage}>{message}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.TRASPARENT
  },
  loader: {
    backgroundColor: colors.WHITE,
    padding: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderMessage: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default Loader;