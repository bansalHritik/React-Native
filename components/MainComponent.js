import React, { Component } from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import About from "./AboutComponents";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import {
  View,
  Platform,
  Image,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView,
} from "react-navigation";
import { Icon } from "react-native-elements";
import {
  fetchComments,
  fetchDishes,
  fetchLeaders,
  fetchPromos,
} from "../redux/ActionCreators";
import { connect } from "react-redux";
console.disableYellowBox = true;

const mapStateToProps = (state) => {
  return {
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchComments: () => dispatch(fetchComments()),
});
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
const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    />
    <View style={styles.drawerHeader}>
      <View style={{ flex: 1 }}>
        <Image
          source={require("./images/logo.png")}
          style={styles.drawerImage}
        />
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
      </View>
    </View>
    <DrawerItems {...props} />
  </ScrollView>
);
const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: "Home",
        drawerLabel: "Home",
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" type="font-awesome" size={24} color={tintColor} />
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
    contentComponent: CustomDrawerContentComponent,
  }
);
class Main extends Component {
  componentDidMount() {
    this.props.fetchComments();
    this.props.fetchDishes();
    this.props.fetchLeaders();
    this.props.fetchPromos();
  }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#512DA8",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    height: 55,
    width: 70,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
