import React, { Component } from "react";
import { Card, ListItem } from "react-native-elements";
import { View, FlatList, Text, ScrollView } from "react-native";
import { LEADERS } from "../shared/leaders";

function RenderLeaders(props) {
  //this will return a leader list item
  const Leader = (leader) => {
    //console.log("leaser", leader);
    return (
      <ListItem
        key={leader.index}
        title={leader.item.name}
        subtitle={leader.item.description}
        hideChevron={true}
        leftAvatar={{ source: require("./images/alberto.png") }}
      ></ListItem>
    );
  };

  // renders a card with list of leaders
  return (
    <Card title="Corporate Leadership">
      <FlatList
        data={props.leaders}
        renderItem={Leader}
        keyExtractor={(leader) => leader.id.toString()}
      ></FlatList>
    </Card>
  );
}
//returns a histroy card
function History() {
  return (
    <Card title="Our History">
      <Text>
        Started in 2010, Ristorante con Fusion quickly established itself as a
        culinary icon par excellence in Hong Kong. With its unique brand of
        world fusion cuisine that can be found nowhere else, it enjoys patronage
        from the A-list clientele in Hong Kong. Featuring four of the best
        three-star Michelin chefs in the world, you never know what will arrive
        on your plate the next time you visit us.
      </Text>
      <Text style={{ marginTop: 10 }}>
        The restaurant traces its humble beginnings to The Frying Pan, a
        successful chain started by our CEO, Mr. Peter Pan, that featured for
        the first time the world's best cuisines in a pan.
      </Text>
    </Card>
  );
}
class AboutComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaders: LEADERS,
    };
  }
  static navigationOptions = {
    title: "About Us",
  };
  render() {
    //console.dir(this.state.leaders);
    return (
      <ScrollView>
        <History />
        <RenderLeaders leaders={this.state.leaders} />
      </ScrollView>
    );
  }
}

export default AboutComponents;
