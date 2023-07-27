import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/native';

import {RootState} from '../store/rootReducer';
import {User} from '../model/user';
import CustomText from '../component/CustomText';
import {
  downloadProfilePDF,
  getFormattedDate,
  getFormattedDob,
} from '../utils/common';
import colors from '../utils/colors';
import DividerLineView from '../component/DividerLineView';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation';
import {Profile} from '../navigation/ScreenNames';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  typeof Profile
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, typeof Profile>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation, route}) => {
  const {selectedEmail} = route.params;

  const selectedUser: User | undefined = useSelector((state: RootState) =>
    state.users.users.find(user => user.email === selectedEmail),
  );

  if (!selectedUser) {
    return <Text>User not found!</Text>;
  }

  const {name, email, dob, registered, location, picture} = selectedUser;

  useEffect(() => {
    navigation.setOptions({
      title: name.first + ' ' + name.last,
    });
  }, [name]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        {/* User Image and Age display */}
        <View style={styles.userImgViewStyle}>
          <Image source={{uri: picture.large}} style={styles.avatar} />
          <View style={styles.ageViewStyle}>
            <CustomText
              style={{color: 'white'}}
              type={'large'}
              title={dob.age}
            />
          </View>
        </View>

        <DividerLineView />

        {/* User email, Date Joined and DOB display */}
        <View>
          <CustomText type={'medium'} title={`Email: ${email}`} />
          <CustomText
            type={'medium'}
            title={`Date Joined: ${getFormattedDate(registered.date)}`}
          />
          <CustomText
            type={'medium'}
            title={`DOB: ${getFormattedDob(dob.date)}`}
          />
        </View>

        <CustomText
          style={styles.userLocationViewStyle}
          type={'large'}
          title={'Location:'}
        />

        <DividerLineView />

        {/* User City, State, Country, Postcode display */}
        <CustomText type={'medium'} title={`City: ${location.city}`} />
        <CustomText type={'medium'} title={`State: ${location.state}`} />
        <CustomText type={'medium'} title={`Country: ${location.country}`} />
        <CustomText type={'medium'} title={`Postcode: ${location.postcode}`} />

        {/* Download User Information in PDF format */}
        <TouchableOpacity
          onPress={() => downloadProfilePDF(selectedUser)}
          style={{
            backgroundColor: 'black',
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            marginTop: 20,
          }}>
          <CustomText
            style={{color: colors.WHITE}}
            type={'large'}
            title={'Download Profile'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  avatar: {
    width: 200,
    height: 200,
    marginBottom: 10,
    alignSelf: 'center',
  },
  ageViewStyle: {
    backgroundColor: 'black',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    right: 0,
    alignSelf: 'center',
  },
  userImgViewStyle: {
    alignSelf: 'center',
    height: 230,
    width: 230,
  },
  userLocationViewStyle: {
    marginTop: 20,
  },
});

export default ProfileScreen;
