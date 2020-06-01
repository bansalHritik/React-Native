import React, { Component } from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import About from "./AboutComponents";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import { View, Platform,Image,StyleSheet,ScrollView } from "react-native";
import { createStackNavigator, createDrawerNavigator,DrawerItems,SafeAreaView } from "react-navigation";
import { Icon } from "react-native-elements";
console.disableYellowBox = true;

//navigation Option can be defined both as object or as function
// a stack naviagtor with some initial configs
// a navigator means from this activity where we can go
const MenuNavigator = createStackNavigator(
  {
    // here order matters
    Menu: {
      screen: Menu,
      navigationOptions: ({ navigation }) => ({
        
        headerLeft: (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }),
    }, // can be written as below
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
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512D11", // color of header
      },
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const AboutNavigator = createStackNavigator(
  {
    About: About, // can be written as below
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512D11", // color of header
      },
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const ContactNavigator = createStackNavigator(
  {
    Contact: Contact, // can be written as below
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512D11", // color of header
      },
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: "Home",
        drawerLabel: "Home",
        drawerIcon: ({ tintColor }) => (
          <Icon 
          name="home" 
          type="font-awesome" 
          size={24} 
          color={tintColor} />
        ),
      },
    },
    Menu: {
      screen: MenuNavigator,
      navigationOptions: {
        title: "Menu",
        drawerLabel: "Menu",
        drawerIcon: ({ tintColor }) => (
          <Icon name="list" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        title: "About Us",
        drawerLabel: "About Us",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="info-circle"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    Contact: {
      screen: ContactNavigator,
      navigationOptions: {
        title: "Contact Us",
        drawerLabel: "Contact Us",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="address-card"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    drawerBackgroundColor: "#512D11",
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
