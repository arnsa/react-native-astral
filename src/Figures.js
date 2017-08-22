import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export const Rectangle = ({ size, width, height, color, rotate, children, style }) => {
  const rotation = rotate ? { transform: [{ rotate: `${rotate}deg` }] } : {};
  const rectangleSize = size ? { width: size, height: size } : { width, height };
  const rectangleStyle = [
    styles.centeredContent,
    { ...rectangleSize, ...rotation, backgroundColor: color },
    style,
  ];

  return (
    <View style={rectangleStyle}>
      {children}
    </View>
  );
};

Rectangle.propTypes = {
  size: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  rotate: PropTypes.number,
  children: PropTypes.element,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
};

Rectangle.defaultProps = {
  size: 0,
  width: 0,
  height: 0,
  color: null,
  rotate: 0,
  children: null,
  style: null,
};

export const Circle = ({ radius, color, children, style }) => {
  const circleStyle = [
    styles.centeredContent,
    {
      width: radius,
      height: radius,
      borderRadius: radius / 2,
      backgroundColor: color,
    },
    style,
  ];

  return (
    <View style={circleStyle}>
      {children}
    </View>
  );
};

Circle.propTypes = {
  radius: PropTypes.number,
  color: PropTypes.string,
  children: PropTypes.element,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
};

Circle.defaultProps = {
  radius: 20,
  color: null,
  children: null,
  style: null,
};

export const Triangle = ({
  leftSideSize,
  rightSideSize,
  topSideSize,
  bottomSideSize,
  color,
  rotate,
  children,
  style,
}) => {
  const rotation = rotate ? { transform: [{ rotate: `${rotate}deg` }] } : {};
  const triangleStyle = [
    styles.triangle,
    style,
    {
      ...rotation,
      borderLeftWidth: leftSideSize,
      borderRightWidth: rightSideSize,
      borderTopWidth: topSideSize,
      borderBottomWidth: bottomSideSize,
      borderBottomColor: color,
    },
  ];

  return (
    <View style={triangleStyle}>
      {children}
    </View>
  );
};

Triangle.propTypes = {
  leftSideSize: PropTypes.number,
  rightSideSize: PropTypes.number,
  topSideSize: PropTypes.number,
  bottomSideSize: PropTypes.number,
  color: PropTypes.string,
  rotate: PropTypes.number,
  children: PropTypes.element,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
};

Triangle.defaultProps = {
  leftSideSize: 0,
  rightSideSize: 0,
  topSideSize: 0,
  bottomSideSize: 0,
  color: null,
  rotate: 0,
  children: null,
  style: null,
};

export const TalkBubble = ({
  leftSideSize,
  rightSideSize,
  topSideSize,
  bottomSideSize,
  positionTop,
  positionLeft,
  positionBottom,
  positionRight,
  color,
  rotate,
  children,
  containerStyle,
  triangleStyle,
}) => {
  const rotation = rotate ? { transform: [{ rotate: `${rotate}deg` }] } : {};
  const trianglePositions = {
    top: positionTop,
    left: positionLeft,
    bottom: positionBottom,
    right: positionRight,
  };

  return (
    <View style={[styles.talkBubble, rotation]}>
      <View
        style={[
          styles.talkBubbleSquare,
          styles.centeredContent,
          containerStyle,
          { backgroundColor: color },
        ]}
      >
        {children}
      </View>
      <Triangle
        color={color}
        topSideSize={topSideSize}
        leftSideSize={leftSideSize}
        bottomSideSize={bottomSideSize}
        rightSideSize={rightSideSize}
        style={[styles.talkBubbleTriangle, trianglePositions, triangleStyle]}
      />
    </View>
  );
};

TalkBubble.propTypes = {
  leftSideSize: PropTypes.number,
  rightSideSize: PropTypes.number,
  topSideSize: PropTypes.number,
  bottomSideSize: PropTypes.number,
  positionTop: PropTypes.number,
  positionLeft: PropTypes.number,
  positionBottom: PropTypes.number,
  positionRight: PropTypes.number,
  color: PropTypes.string,
  rotate: PropTypes.number,
  children: PropTypes.element,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  triangleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
};

TalkBubble.defaultProps = {
  leftSideSize: 0,
  rightSideSize: 0,
  topSideSize: 0,
  bottomSideSize: 0,
  positionTop: 0,
  positionLeft: 0,
  positionBottom: 0,
  positionRight: 0,
  color: null,
  rotate: 0,
  children: null,
  containerStyle: null,
  triangleStyle: null,
};

const styles = StyleSheet.create({
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  talkBubble: {
    backgroundColor: 'transparent',
  },
  talkBubbleSquare: {
    width: 120,
    height: 80,
  },
  talkBubbleTriangle: {
    position: 'absolute',
  },
});
