import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

export default class CollapsibleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

    this._height = 0;
    this.animatedHeight = new Animated.Value(0);

    this._onLayout = this._onLayout.bind(this);
    this._toggleItem = this._toggleItem.bind(this);
  }

  _onLayout(event) {
    this._height = event.nativeEvent.layout.height;
  }

  _toggleItem() {
    if (this.state.visible) this._collapse();
    else this._expand();
  }

  _collapse() {
    this.setState({ visible: false });
    Animated.timing(this.animatedHeight, { toValue: 0, duration: 200 }).start();
  }

  _expand() {
    this.setState({ visible: true });
    Animated.timing(this.animatedHeight, { toValue: this._height, duration: 200 }).start();
  }

  _renderDefaultHeader() {
    const {
      title,
      titleStyle,
      description,
      descriptionStyle,
      touchableContainerStyle,
    } = this.props;

    return (
      <View style={[styles.headerContainer, touchableContainerStyle]}>
        <Text style={titleStyle}>{title}</Text>
        {description && <Text style={descriptionStyle}>{description}</Text>}
      </View>
    );
  }

  render() {
    const { visible } = this.state;
    const { containerStyle, renderHeader } = this.props;

    return (
      <View style={containerStyle}>
        <TouchableWithoutFeedback onPress={this._toggleItem}>
          {renderHeader ? renderHeader(visible) : this._renderDefaultHeader()}
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.animatedContainer, { height: this.animatedHeight }]}
        >
          <View onLayout={this._onLayout}>
            {this.props.children}
          </View>
        </Animated.View>
      </View>
    );
  }
}

CollapsibleItem.propTypes = {
  title: PropTypes.string,
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  description: PropTypes.string,
  descriptionStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  children: PropTypes.element,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  renderHeader: PropTypes.func,
  touchableContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

CollapsibleItem.defaultProps = {
  title: null,
  titleStyle: null,
  description: null,
  descriptionStyle: null,
  children: null,
  containerStyle: null,
  renderHeader: null,
  touchableContainerStyle: null,
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  animatedContainer: {
    overflow: 'scroll',
  },
});
