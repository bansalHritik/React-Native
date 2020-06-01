import React, { Component } from "react";
import { Card } from "react-native-elements";
import { Text } from "react-native";

class Contact extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: "Contact Us",
  };
  render() {
    return (
      <Card title="Our Addess">
        <Text style={{ marginBottom: 10 }}>121, Clear Water Bay Road</Text>
        <Text style={{ marginBottom: 10 }}>Clear Water Bay, Kowloon</Text>
        <Text style={{ marginBottom: 10 }}>HONG KONG</Text>
        <Text style={{ marginBottom: 10 }}>Tel: +852 1234 5678</Text>
        <Text style={{ marginBottom: 10 }}>Fax: +852 8765 4321</Text>
        <Text style={{ marginBottom: 10 }}>Email:confusion@food.net</Text>
      </Card>
    );
  }
}
export default Contact;
