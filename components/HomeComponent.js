import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { Card } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

function RenderItem(props) {
  const item = props.item;
  if (item != null) {
    return (
      <Card
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        image={require("./images/utappizza.png")}
      >
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
}
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    };
  }
  static navigationOptions = {
    title: "Home",
  };
  render() {
    return (
      <ScrollView>
        <RenderItem
          item={this.state.dishes.filter((dishes) => dishes.featured)[0]}
        />
        <RenderItem
          item={
            this.state.promotions.filter((dishes) => promotions.featured)[0]
          }
        />
        <RenderItem
          item={this.state.leaders.filter((dishes) => leaders.featured)[0]}
        />
      </ScrollView>
    );
  }
}
export default Home;
