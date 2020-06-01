import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { DISHES } from "../shared/dishes";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }
  // the title of currrent activity or view
  static navigationOptions = {
    title: "Menu",
  };

  render() {
    // TODO : Dont know what it is
    const { navigate } = this.props.navigation;
    const renderMenuItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          hideChevron={true}
          leftAvatar={{ source: require("./images/uthappizza.png") }}
          onPress={() => navigate("DishDetail", { dishId: item.id })}
        />
      );
    };

    return (
      <FlatList
        data={this.state.dishes}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default Menu;
