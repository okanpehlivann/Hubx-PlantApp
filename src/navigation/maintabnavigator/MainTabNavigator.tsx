import React, { type RefObject } from 'react';
import {
  createBottomTabNavigator,
  type BottomTabBarButtonProps,
} from '@react-navigation/bottom-tabs';
import { Pressable, View, type ViewInstance } from 'react-native';
import {
  TabDiagnoseIcon,
  TabGardenIcon,
  TabHomeIcon,
  TabProfileIcon,
  TabScanIcon,
} from '@assets';
import { COLORS } from '@constants';
import { useCamera } from '@hooks';
import {
  DiagnoseScreen,
  GardenScreen,
  HomeScreen,
  ProfileScreen,
  ScanScreen,
} from '@screens';
import type { MainTabParamList } from '@types';
import { HomeTourProvider, useHomeTourTargets } from '@context';
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

type ScanTabButtonProps = BottomTabBarButtonProps & {
  tourTargetRef: RefObject<ViewInstance | null>;
};

const ScanTabButton = ({
  onPress,
  onLongPress,
  accessibilityState,
  accessibilityLabel,
  testID,
  tourTargetRef,
}: ScanTabButtonProps) => {
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
      <View
        ref={tourTargetRef}
        collapsable={false}
        style={styles.scanButtonOuter}
      >
        <View style={styles.scanButtonInner}>
          <TabScanIcon width={32} height={32} />
        </View>
      </View>
    </Pressable>
  );
};

const ConnectedScanTabButton = (props: BottomTabBarButtonProps) => {
  const { scanButtonRef } = useHomeTourTargets();
  const { openCamera } = useCamera();

  const handlePress = (
    event: Parameters<NonNullable<BottomTabBarButtonProps['onPress']>>[0],
  ) => {
    props.onPress?.(event);
    openCamera().catch(() => undefined);
  };

  return (
    <ScanTabButton
      {...props}
      onPress={handlePress}
      tourTargetRef={scanButtonRef}
    />
  );
};

const renderScanTabButton = (props: BottomTabBarButtonProps) => (
  <ConnectedScanTabButton {...props} />
);

const MainTabs = () => {
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
          tabBarButton: renderScanTabButton,
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
};

export default function MainTabNavigator() {
  return (
    <HomeTourProvider>
      <MainTabs />
    </HomeTourProvider>
  );
}
