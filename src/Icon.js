import React from 'react';
import PropTypes from 'prop-types';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const Icons = {
  Entypo,
  EvilIcons,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
  Zocial,
  SimpleLineIcons,
};

export const Types = {
  ENTYPO: 'Entypo',
  EVIL_ICONS: 'EvilIcons',
  FONT_AWESOME: 'FontAwesome',
  FOUNDATION: 'Foundation',
  IONICONS: 'Ionicons',
  MATERIAL_ICONS: 'MaterialIcons',
  MATERIAL_COMMUNITY_ICONS: 'MaterialCommunityIcons',
  OCTICONS: 'Octicons',
  ZOCIAL: 'Zocial',
  SIMPLE_LINE_ICONS: 'SimpleLineIcons',
};

const Icon = ({
  type,
  name,
  size,
  color,
  style,
}) => {
  const { ...other } = this.props;
  const props = { name, size, color, style, ...other };
  const icon = Icons[type];

  if (!icon) return null;

  return React.createElement(Icons[type], props);
};

Icon.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
};

Icon.defaultProps = {
  type: null,
  name: null,
  size: null,
  color: null,
  style: null,
};

export default Icon;
