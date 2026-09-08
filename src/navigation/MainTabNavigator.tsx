import React from 'react';
import {
  createBottomTabNavigator,
  type BottomTabBarButtonProps,
} from '@react-navigation/bottom-tabs';
import { Pressable, View } from 'react-native';
import {
  TabDiagnoseIcon,
  TabGardenIcon,
  TabHomeIcon,
  TabProfileIcon,
  TabScanIcon,
} from '@assets';
import { COLORS } from '@constants';
import {
  DiagnoseScreen,
  GardenScreen,
  HomeScreen,
  ProfileScreen,
  ScanScreen,
} from '@screens';
import type { MainTabParamList } from './types';
import styles from './MainTabNavigator.styles';

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabIconProps = {
  color: string;
};

const renderHomeIcon = ({ color }: TabIconProps) => (
  <TabHomeIcon width={23} height={23} color={color} />
);

const renderDiagnoseIcon = ({ color }: TabIconProps) => (
  <TabDiagnoseIcon width={24} height={24} color={color} />
);

const renderGardenIcon = ({ color }: TabIconProps) => (
  <TabGardenIcon width={24} height={24} color={color} />
);

const renderProfileIcon = ({ color }: TabIconProps) => (
  <TabProfileIcon width={23} height={23} color={color} />
);

const hideTabLabel = () => null;

const TabBarButton = ({
  onPress,
  onLongPress,
  accessibilityState,
  accessibilityLabel,
  testID,
  children,
  style,
}: BottomTabBarButtonProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      accessibilityLabel={accessibilityLabel}
      onLongPress={onLongPress}
      onPress={event => onPress?.(event)}
      testID={testID}
      android_ripple={{ color: 'transparent' }}
      style={style}
    >
      {children}
    </Pressable>
  );
};

const ScanTabButton = ({
  onPress,
  onLongPress,
  accessibilityState,
  accessibilityLabel,
  testID,
}: BottomTabBarButtonProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      accessibilityLabel={accessibilityLabel ?? 'Scan'}
      onLongPress={onLongPress}
      onPress={event => onPress?.(event)}
      testID={testID}
      android_ripple={{ color: 'transparent' }}
      style={styles.scanTabButton}
    >
      <View style={styles.scanButtonOuter}>
        <View style={styles.scanButtonInner}>
          <TabScanIcon width={32} height={32} />
        </View>
      </View>
    </Pressable>
  );
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: COLORS.tabInactive,
        tabBarButton: TabBarButton,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: renderHomeIcon,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Diagnose"
        component={DiagnoseScreen}
        options={{
          tabBarIcon: renderDiagnoseIcon,
          tabBarLabel: 'Diagnose',
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarButton: ScanTabButton,
          tabBarItemStyle: styles.scanTabItem,
          tabBarLabel: hideTabLabel,
        }}
      />
      <Tab.Screen
        name="Garden"
        component={GardenScreen}
        options={{
          tabBarIcon: renderGardenIcon,
          tabBarLabel: 'My Garden',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: renderProfileIcon,
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}
