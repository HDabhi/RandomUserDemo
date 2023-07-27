import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Profile } from './ScreenNames';

export type RootStackParamList = {
  Home: undefined;
  Profile: { selectedEmail: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const NaviagtionScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Home}
          component={HomeScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen name={Profile} component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NaviagtionScreen