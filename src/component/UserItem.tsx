import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';

import CustomText from './CustomText';
import {getFormattedDate} from '../utils/common';
import {User} from '../model/user';

interface UserItemProps {
  item: User;
  handlePress: (user: User) => void;
}

const UserItem: React.FC<UserItemProps> = ({item, handlePress}) => {
  const onPress = () => {
    handlePress(item);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.containerStyle}>
      <View style={styles.userViewStyle}>
        <Image
          style={styles.userImgStyle}
          source={{uri: item.picture.medium}}
        />

        <View style={styles.userInformationViewStyle}>
          <CustomText
            type={'medium'}
            title={`${item.name.first} ${item.name.last}`}
          />
          <CustomText title={item.email} />
          <CustomText title={`Country | ${item.location.country}`} />
        </View>
      </View>

      <CustomText title={getFormattedDate(item.registered.date)} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    padding: 10,
  },
  userViewStyle: {
    flexDirection: 'row',
    flex: 1,
    overflow: 'hidden',
  },
  userInformationViewStyle: {
    marginStart: 10,
    flex: 1,
  },
  userImgStyle: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
});

export default UserItem;

