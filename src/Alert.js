import { Alert as RNAlert } from 'react-native';
import PropTypes from 'prop-types';

const Alert = (title, body, buttons, options) => {
  const btns = [];

  buttons.forEach((btn) => {
    if (typeof btn === 'string') {
      btns.push({ text: btn });
    } else if (typeof btn === 'object') {
      btns.push(btn);
    }
  });

  RNAlert.alert(title, body, btns, options);
};

Alert.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      text: PropTypes.string,
      onPress: PropTypes.func,
    }),
  ])),
  options: PropTypes.shape({
    cancelable: PropTypes.bool,
  }),
};

Alert.defaultProps = {
  title: '',
  body: '',
  buttons: [],
  options: {},
};


export default Alert;
