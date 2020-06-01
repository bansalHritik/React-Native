import React, { Component } from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import DishDetail from "./DishDetailComponent";
import { View, Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

// a stack naviagtor with some initial configs
const MenuNavigator = createStackNavigator(
  {
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
        <MenuNavigator />
      </View>
    );
  }
}

export default Main;