import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home/Home";
import { Text, VStack, useStyled, useTheme } from "@gluestack-ui/themed";
import { BottomTabsParams } from "./config";
import Ionicons from "@expo/vector-icons/Ionicons";
import Quizz from "../screens/quizz-mode/Quizz";
import Practice from "../screens/guess-word/Practice";
import Puzzle from "../screens/puzzle/Puzzle";
import { UseTokenColor } from "../hook/UseTokenColor";
import * as Animatable from "react-native-animatable";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Tab = createBottomTabNavigator<BottomTabsParams>();

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -34 },
  1: { scale: 1.2, translateY: -24 },
};
const animate2 = {
  0: { scale: 1.2, translateY: -24 },
  1: { scale: 1, translateY: 7 },
};

const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.9 },
  0.5: { scale: 0.2 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };
interface ITabIcon {
  focused: boolean;
  name: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: any;
}
const TabIcon = ({ focused, name, title, onPress }: ITabIcon) => {
  const colors = UseTokenColor();
  const viewRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const textRef = useRef<any>(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={onPress}
    >
      <Animatable.View ref={viewRef} duration={500} style={styles.container}>
        <View
          style={[
            styles.btn,
            {
              borderColor: colors.white,
              backgroundColor: colors.white,
            },
          ]}
        >
          <Animatable.View ref={circleRef} style={styles.circle} />
          <Ionicons
            name={name}
            size={20}
            color={focused ? colors.white : colors.primary600}
          />
        </View>
        <Animatable.Text ref={textRef} style={[styles.text]}>
          {title}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

interface ITabData {
  id: number;
  tabName: keyof BottomTabsParams;
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  component: any;
}

export const TabData: ITabData[] = [
  {
    id: 1,
    tabName: "Home",
    title: "Trang chủ",
    iconName: "home",
    component: Home,
  },
  {
    id: 2,
    tabName: "Quizz",
    title: "Trắc nghiệm",
    iconName: "apps",
    component: Quizz,
  },
  // {
  //   id: 3,
  //   tabName: "Practice",
  //   title: "Nối từ",
  //   iconName: "bulb",
  //   component: Practice,
  // },
  {
    id: 3,
    tabName: "Puzzle",
    title: "Xếp hình",
    iconName: "extension-puzzle",
    component: Puzzle,
  },
];
const colors = UseTokenColor();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {},
      }}
    >
      {TabData.map((tab) => (
        <Tab.Screen
          key={tab.id}
          name={tab.tabName}
          component={tab.component}
          options={{
            tabBarButton: ({ onPress, accessibilityState }) => (
              <TabIcon
                focused={accessibilityState?.selected ?? false}
                name={tab.iconName}
                title={tab.title}
                onPress={onPress}
              />
            ),
            headerShown: true,
            title: tab.title,
            headerStyle: {
              backgroundColor: colors.primary600,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            },
            headerTitleStyle: {
              color: colors.white,
            },
            tabBarStyle: {
              backgroundColor: colors.primary600,
              alignItems: "center",
              height: 70,
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
  },
  tabBar: {
    height: 70,
    position: "absolute",
    margin: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary600,
    borderRadius: 25,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: colors.white,
    fontWeight: "500",
    marginTop: 5,
  },
});
