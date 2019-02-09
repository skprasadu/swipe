import React, { Component } from "react";
import { View, Animated, PanResponder } from "react-native";

export class Deck extends Component {
  constructor(props) {
    super(props);

    const postion = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        postion.setValue({
          x: gesture.dx,
          y: gesture.dy
        });
      },
      onPanResponderRelease: () => true
    });

    this.state = { panResponder, postion };
  }

  renderCards() {
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View style={this.state.postion.getLayout()}>
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return this.props.renderCard(item);
    });
  }

  render() {
    return (
      <View {...this.state.panResponder.panHandlers}>{this.renderCards()}</View>
    );
  }
}

export default Deck;
