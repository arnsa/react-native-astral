import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import PropTypes from 'prop-types';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._onLayout = this._onLayout.bind(this);
  }

  componentDidMount() {
    const { animateToRegion, animateToCoordinate } = this.props;

    if (animateToRegion) {
      this._animateToRegion(animateToRegion);
    } else if (animateToCoordinate) {
      this._animateToCoordinate(animateToCoordinate);
    }
  }

  _onLayout() {
    const { fitToSuppliedMarkers, fitToCoordinates } = this.props;

    if (fitToSuppliedMarkers) {
      this._fitToSuppliedMarkers(fitToSuppliedMarkers);
    } else if (fitToCoordinates) {
      this._fitToCoordinates(fitToCoordinates);
    }
  }

  _animateToRegion({ region, duration }) {
    this.mapView.animateToRegion(region, duration);
  }

  _animateToCoordinate({ coordinate, duration }) {
    this.mapView.animateToCoordinate(coordinate, duration);
  }

  _fitToSuppliedMarkers({ markerIDs, animated }) {
    this.mapView.fitToSuppliedMarkers(markerIDs, animated);
  }

  _fitToCoordinates({ coordinates, options }) {
    this.mapView.fitToCoordinates(coordinates, options);
  }

  render() {
    const { useNativeMap, containerStyle, mapStyle, children, ...other } = this.props;
    const provider = useNativeMap ? PROVIDER_DEFAULT : PROVIDER_GOOGLE;

    return (
      <View style={[{ ...StyleSheet.absoluteFillObject }, containerStyle]}>
        <MapView
          ref={(ref) => { this.mapView = ref; }}
          provider={provider}
          onLayout={this._onLayout}
          style={[{ ...StyleSheet.absoluteFillObject }, mapStyle]}
          {...other}
        >
          {children}
          <MapView.Marker
            identifier="a"
            coordinate={{
              latitude: 54.687,
              longitude: 25.282,
            }}
          />
          <MapView.Marker
            identifier="b"
            coordinate={{
              latitude: 54.587,
              longitude: 25.282,
            }}
          />
        </MapView>
      </View>
    );
  }
}

Map.Marker = ({ ...other }) => <MapView.Marker {...other} />;
Map.Callout = ({ ...other }) => <MapView.Callout {...other} />;
Map.Polygon = ({ ...other }) => <MapView.Polygon {...other} />;
Map.Polyline = ({ ...other }) => <MapView.Polyline {...other} />;
Map.Circle = ({ ...other }) => <MapView.Circle {...other} />;

const CoordinateType = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

const RegionType = {
  ...CoordinateType,
  latitudeDelta: PropTypes.number,
  longitudeDelta: PropTypes.number,
};

const EdgePaddingType = {
  top: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
};

Map.propTypes = {
  useNativeMap: PropTypes.bool,
  children: PropTypes.element,
  animateToRegion: PropTypes.shape({
    region: PropTypes.shape(RegionType),
    duration: PropTypes.number,
  }),
  animateToCoordinate: PropTypes.shape({
    coordinate: PropTypes.shape(CoordinateType),
    duration: PropTypes.number,
  }),
  fitToSuppliedMarkers: PropTypes.shape({
    markerIDs: PropTypes.array,
    animated: PropTypes.bool,
  }),
  fitToCoordinates: PropTypes.shape({
    coordinates: PropTypes.array,
    options: PropTypes.shape({
      edgePadding: PropTypes.shape(EdgePaddingType),
      animated: PropTypes.bool,
    }),
  }),
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  mapStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
};

Map.defaultProps = {
  useNativeMap: false,
  children: null,
  animateToRegion: null,
  animateToCoordinate: null,
  fitToSuppliedMarkers: null,
  fitToCoordinates: null,
  containerStyle: null,
  mapStyle: null,
};

export default Map;
