import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

class Loader extends Component {
  _renderPlainLoader() {
    const { animating, hasDarkening, containerStyle, backgroundStyle, loaderStyle } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        {hasDarkening && <View style={[styles.background, backgroundStyle]} />}
        <ActivityIndicator
          animating={animating}
          style={[styles.loader, loaderStyle]}
          size="large"
        />
      </View>
    );
  }

  _renderLoaderWithBox() {
    const {
      animating,
      text,
      containerStyle,
      wrapperStyle,
      loaderStyle,
      textStyle,
      backgroundStyle,
    } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.background, backgroundStyle]} />
        <View style={[styles.wrapper, wrapperStyle, (text ? { paddingBottom: 20 } : null)]}>
          <ActivityIndicator
            animating={animating}
            style={[styles.loader, loaderStyle]}
            size="large"
          />
          {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
        </View>
      </View>
    );
  }

  render() {
    const { animating, theme } = this.props;

    if (!animating) {
      return null;
    }

    if (theme === 'WITH_BOX') {
      return this._renderLoaderWithBox();
    }

    return this._renderPlainLoader();
  }
}

Loader.propTypes = {
  animating: PropTypes.bool,
  hasDarkening: PropTypes.bool,
  theme: PropTypes.string,
  text: PropTypes.string,
  containerStyle: View.propTypes.style,
  backgroundStyle: View.propTypes.style,
  wrapperStyle: View.propTypes.style,
  loaderStyle: ActivityIndicator.propTypes.style,
  textStyle: Text.propTypes.style,
};

Loader.defaultProps = {
  animating: false,
  hasDarkening: true,
  theme: 'PLAIN',
  text: null,
  containerStyle: null,
  backgroundStyle: null,
  wrapperStyle: null,
  loaderStyle: null,
  textStyle: null,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  wrapper: {
    justifyContent: 'flex-end',
    width: '50%',
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 99999,
  },
  loader: {
    flex: 1,
    height: 80,
  },
  text: {
    paddingTop: 30,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default Loader;
