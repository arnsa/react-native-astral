import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

export default class NavBar extends React.Component {
  _renderTitle() {
    const { title, titleComponent, subtitleComponent, subtitle } = this.props;
    let sub = null;

    if (titleComponent) {
      return titleComponent;
    }

    if (title) {
      if (subtitle) {
        sub = <Text numberOfLines={1} style={styles.subHeaderText}>{subtitle}</Text>;
      } else if (subtitleComponent) {
        sub = subtitleComponent;
      }

      return (
        <View style={styles.centerCont}>
          <Text numberOfLines={1} style={styles.headerText}>{title}</Text>
          {sub}
        </View>
      );
    }

    return null;
  }

  _renderButton(side, buttonComponent, title, icon, contStyle, textStyle, onPress) {
    if (buttonComponent) {
      return buttonComponent;
    }

    let content = null;
    let btnCont = null;

    if (icon && title) {
      content = (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[styles.buttonText, { textAlign: side, paddingRight: 10 }, textStyle]}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Image style={styles.imageStyle} source={icon} />
        </View>
      );
    } else if (icon) {
      const source = typeof icon === 'string' ? { uri: icon } : icon;

      content = <Image style={styles.imageStyle} source={source} />;
    } else if (title) {
      content = (
        <Text
          style={[styles.buttonText, { textAlign: side }, textStyle]}
          numberOfLines={1}
        >
          {title}
        </Text>
      );
    }

    if (!onPress) {
      btnCont = (
        <View style={styles.backBtn}>
          {content}
        </View>
      );
    } else {
      btnCont = (
        <TouchableOpacity style={styles.backBtn} onPress={onPress}>
          {content}
        </TouchableOpacity>
      );
    }

    return (
      <View style={[(side === 'left' ? styles.leftCont : styles.rightCont), contStyle]}>
        {btnCont}
      </View>
    );
  }

  render() {
    const {
      titleLeft,
      titleRight,
      iconLeft,
      iconRight,
      leftButtonComponent,
      rightButtonComponent,
      onLeftButtonPress,
      onRightButtonPress,
      shadow,
      containerStyle,
      wrapperStyle,
      leftContainerStyle,
      rightContainerStyle,
      leftTextStyle,
      rightTextStyle,
    } = this.props;

    return (
      <View style={[styles.cont, (shadow ? styles.contShadow : null), containerStyle]}>
        <View style={[styles.itemContainer, wrapperStyle]}>
          {this._renderButton('left', leftButtonComponent, titleLeft, iconLeft, leftContainerStyle, leftTextStyle, onLeftButtonPress)}
          {this._renderTitle()}
          {this._renderButton('right', rightButtonComponent, titleRight, iconRight, rightContainerStyle, rightTextStyle, onRightButtonPress)}
        </View>
      </View>
    );
  }
}

NavBar.propTypes = {
  title: PropTypes.string,
  titleLeft: PropTypes.string,
  titleRight: PropTypes.string,
  titleComponent: PropTypes.element,
  subtitle: PropTypes.string,
  subtitleComponent: PropTypes.element,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  leftButtonComponent: PropTypes.element,
  rightButtonComponent: PropTypes.element,
  onLeftButtonPress: PropTypes.func,
  onRightButtonPress: PropTypes.func,
  shadow: PropTypes.bool,
  containerStyle: View.propTypes.style,
  wrapperStyle: View.propTypes.style,
  leftContainerStyle: View.propTypes.style,
  rightContainerStyle: View.propTypes.style,
  leftTextStyle: Text.propTypes.style,
  rightTextStyle: Text.propTypes.style,
};

NavBar.defaultProps = {
  title: null,
  titleLeft: null,
  titleRight: null,
  titleComponent: null,
  subtitle: null,
  subtitleComponent: null,
  iconLeft: null,
  iconRight: null,
  leftButtonComponent: null,
  rightButtonComponent: null,
  onLeftButtonPress: null,
  onRightButtonPress: null,
  shadow: false,
  containerStyle: null,
  wrapperStyle: null,
  leftContainerStyle: null,
  rightContainerStyle: null,
  leftTextStyle: null,
  rightTextStyle: null,
};

const styles = StyleSheet.create({
  cont: {
    height: 64,
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 17 : 0,
    zIndex: Platform.OS === 'ios' ? 999 : 0,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contShadow: {
    shadowOffset: { width: 0, height: 1 },
    shadowColor: '#000',
    shadowOpacity: 0.1,
    borderColor: '#fff',
    borderWidth: 3,
    elevation: 2,
  },
  centerCont: {
    flex: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftCont: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightCont: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  backBtn: {
    padding: 10,
  },
  headerText: {
    fontSize: 16,
    textAlign: 'center',
  },
  subHeaderText: {
    flex: 1,
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
  },
  imageStyle: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  buttonText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 17,
    color: '#000',
  },
});
