import React, { Component } from "react";
import { Card, ListItem } from "react-native-elements";
import { FlatList, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import {Loading} from './LoadingComponent';
import * as Animatable from "react-native-animatable";
const mapStateToProps = (state) => {
  return {
    leaders: state.leaders,
  };
};

function RenderLeaders(props) {
  //this will return a leader list item
  const Leader = ({ item, index }) => {
    //console.log("leaser", leader);
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        leftAvatar={{ source: { uri: baseUrl + item.image } }}
      ></ListItem>
    );
  };

  // renders a card with list of leaders
  return (
    <Card title="Corporate Leadership">
      <FlatList
        data={props.leaders}
        renderItem={Leader}
        keyExtractor={(item) => item.id.toString()}
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
class About extends Component {
  static navigationOptions = {
    title: "About Us",
  };
  render() {
    if (this.props.leaders.isLoading) {
      return (
        <ScrollView>
          <History />
          <Card 
          title = 'Corporate Leadership' >
          <Loading />
          </Card>
        </ScrollView>
      );
    } else if(this.props.leaders.errMess) {
       return (
         <ScrollView>
           <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
             <History />
             <Card title="Corporate Leadership">
               <Text>{this.props.leaders.errMess}</Text>
             </Card>
           </Animatable.View>
         </ScrollView>
       );
    }
    else {
      return (
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <History />
            <RenderLeaders leaders={this.props.leaders.leaders} />
          </Animatable.View>
        </ScrollView>
      );
    }
  }
}

export default connect(mapStateToProps)(About);
