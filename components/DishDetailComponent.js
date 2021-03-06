import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Modal,
  Button,
  StyleSheet,
  PanResponder,
  Alert,
} from "react-native";
import { Card, Icon, Input, Rating, AirbnbRating } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import { postFavorite, postComment } from "../redux/ActionCreators";
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment, id) =>
    dispatch(postComment(dishId, rating, author, comment, id)),
});

function RenderDish(props) {
  const dish = props.dish;

  handleViewRef = (ref) => (this.view = ref);
  const recognizeDragRightToLeft = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) {
      return true;
    }
    return false;
  };
  const recognizeComment = ({ moveX, moveY, dx, dy }) => {
    if (dx < 200) {
      return true;
    }
    return false;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (event, gestureState) => {
      return true;
    },
    onPanResponderGrant: () => {
      this.view
        .pulse(1000)
        .then((endState) =>
          console.log(endState.finished ? "Finished" : "Cancelled")
        );
    },
    onPanResponderEnd: (event, gestureState) => {
      if (recognizeDragRightToLeft(gestureState)) {
        Alert.alert(
          "Add To Favorite ?",
          "Are You sure you wish to add " + dish.name + " to favorite",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancelled Pressed"),
              style: "cancel",
            },
            {
              text: "Ok",
              onPress: () =>
                props.favorite
                  ? console.log("Already Favorite")
                  : props.onPress(),
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
      } else if (recognizeComment(gestureState)) {
        props.toggleModal();
      }
      return true;
    },
  });
  if (dish != null) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        ref={this.handleViewRef}
        {...panResponder.panHandlers}
      >
        <Card
          featuredTitle={dish.name}
          image={{ uri: baseUrl + dish.image }}
          wrapperStyle={{ alignItems: "center" }}
        >
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <Icon
            raised
            reverse
            name={props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() =>
              props.favorite ? console.log("Already Favorite") : props.onPress()
            }
          ></Icon>
          <Icon
            raised
            reverse
            name={"pencil"}
            type="font-awesome"
            color="#0000A0"
            onPress={() => props.toggleModal()}
          ></Icon>
        </Card>
      </Animatable.View>
    );
  } else {
    return <View></View>;
  }
}

function RenderComments(props) {
  const comments = props.comments;
  const RenderCommentsItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10, alignItems: "flex-start" }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <AirbnbRating
          count={item.rating}
          showRating={false}
          isDisabled
          size={15}
        />
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}
        </Text>
      </View>
    );
  };
  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={RenderCommentsItem}
          keyExtractor={(item) => item.id.toString()}
        ></FlatList>
      </Card>
    </Animatable.View>
  );
}
class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      author: "",
      comment: "",
      rating: 1,
    };
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  setAuthor(author) {
    this.setState({ author });
  }

  setRating(rating) {
    this.setState({ rating });
  }

  setComment(comment) {
    this.setState({ comment });
  }

  handleOnClick(dishId) {
    if (
      this.state.author !== "" &&
      (this.state.comment !== "" || this.state.rating)
    ) {
      this.props.postComment(
        dishId,
        this.state.rating,
        this.state.author,
        this.state.comment,
        this.state.comment.length
      );
      this.toggleModal();
      this.resetForm();
    }
  }
  resetForm() {
    this.setState({
      author: "",
      comment: "",
      rating: 1,
    });
  }
  static navigationOptions = {
    title: "Dish Details",
  };
  render() {
    const dishId = +this.props.navigation.getParam("dishId", "");

    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          toggleModal={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.isModalOpen}
          onDismiss={() => {
            this.toggleModal();
          }}
          onRequestClose={() => {
            this.toggleModal();
          }}
        >
          <View style={{ padding: 10 }}>
            <Rating
              ratingCount={5}
              showRating
              onFinishRating={(rating) => this.setRating(rating)}
              minValue={1}
              startingValue={1}
            />

            <Input
              placeholder="Enter Your Name"
              onChangeText={(author) => this.setAuthor(author)}
              leftIcon={{ type: "font-awesome", name: "user" }}
            />

            <Input
              placeholder="Type your comment here"
              onChangeText={(comment) => this.setComment(comment)}
              leftIcon={<Icon name="comment" underlayColor="white" size={20} />}
            />
            <Button title="Submit" onPress={() => this.handleOnClick(dishId)} />
            <Button
              color="#a9a9a9"
              title="Cancel"
              onPress={() => this.toggleModal()}
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
