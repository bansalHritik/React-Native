import React, { Component } from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import DishDetail from "./DishDetailComponent";
import { View, Platform } from "react-native";
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

// a stack naviagtor with some initial configs
// a navigator means from this activity where we can go
const MenuNavigator = createStackNavigator(
  {
    // here order matters
    Menu: Menu, // can be written as below
    DishDetail: { screen: DishDetail }, // may be something like routes
  },
  {
    initailRouteName: "Menu", // Default Screen
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#512D11", // color of header
      },
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);
// we have used this to get the top title bar
const HomeNavigator = createStackNavigator(
  {
    Home: Home, // can be written as below
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#512D11", // color of header
      },
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: "Home",
        drawerLabel: "Home",
      },
    },
    Menu: {
      screen: MenuNavigator,
      navigationOptions: {
        title: "Menu",
        drawerLabel: "Menu",
      },
    },
  },
  {
    drawerBackgroundColor: "#D1C$E(",
  }
);
class Main extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop:
            Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        }}
      >
        <MainNavigator />
      </View>
    );
  }
}

export default Main;