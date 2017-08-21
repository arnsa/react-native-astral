import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class TabBarIcon extends Component {
  static iconContainerStyle = {};
  static iconStyle = {};
  static iconTextStyle = {};
  static activeIconTextStyle = {};
  static inactiveIconTextStyle = {};

  render() {
    const {
      selected,
      title,
      iconSource,
      iconContainerStyle,
      iconStyle,
      iconTextStyle,
      activeIconTextStyle,
      inactiveIconTextStyle,
    } = this.props;

    const source = typeof iconSource === 'string' ? { uri: iconSource } : iconSource;
    const textStyle = [iconTextStyle, TabBarIcon.iconTextStyle];

    if (selected) {
      textStyle.push(TabBarIcon.activeIconTextStyle);
      textStyle.push(activeIconTextStyle);
    } else {
      textStyle.push(TabBarIcon.inactiveIconTextStyle);
      textStyle.push(inactiveIconTextStyle);
    }

    return (
      <View style={[styles.iconCont, TabBarIcon.iconContainerStyle, iconContainerStyle]}>
        <Image style={[styles.icon, TabBarIcon.iconStyle, iconStyle]} source={source} />
        <Text style={textStyle}>{title}</Text>
      </View>
    );
  }
}

TabBarIcon.propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
  iconSource: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  iconTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  activeIconTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  inactiveIconTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

TabBarIcon.defaultProps = {
  selected: false,
  title: null,
  iconSource: null,
  iconContainerStyle: null,
  iconStyle: null,
  iconTextStyle: null,
  activeIconTextStyle: null,
  inactiveIconTextStyle: null,
};

const styles = StyleSheet.create({
  iconCont: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    paddingBottom: 3,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default TabBarIcon;
