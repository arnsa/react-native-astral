import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

class Button extends Component {
  _renderGradientContent() {
    const { text, colors, showBorder, disabled, containerStyle, children } = this.props;

    return (
      <LinearGradient
        colors={colors}
        style={[styles.cont, containerStyle, (showBorder ? { borderWidth: 2 } : null)]}
      >
        {text && <Text style={styles.text}>{text}</Text>}
        {children}
        {disabled && <View style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />}
      </LinearGradient>
    );
  }

  _renderSimpleContent() {
    const { text, showBorder, disabled, containerStyle, children } = this.props;

    return (
      <View style={[styles.cont, containerStyle, (showBorder ? { borderWidth: 2 } : null)]}>
        {text && <Text style={styles.text}>{text}</Text>}
        {children}
        {disabled && <View style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />}
      </View>
    );
  }

  render() {
    const { colors, disabled, onPress } = this.props;
    let content = null;

    if (colors) {
      content = this._renderGradientContent();
    } else {
      content = this._renderSimpleContent();
    }

    return (
      <TouchableOpacity style={{ width: '100%' }} disabled={disabled} onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  showBorder: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  children: PropTypes.element,
};

Button.defaultProps = {
  text: null,
  colors: null,
  showBorder: false,
  disabled: false,
  onPress: () => null,
  containerStyle: {},
  children: null,
};

const styles = StyleSheet.create({
  cont: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    backgroundColor: 'transparent',
  },
});

export default Button;
