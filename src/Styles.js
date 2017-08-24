import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },
  flexCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexVerticalSpaceBetween: {
    flex: 1,
    justifyContent: 'space-between',
  },
  flexHorizontalSpaceBetween: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexCenterSpaceBetween: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRowCenterSpaceBetween: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  absoluteFull: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  absoluteFullCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
