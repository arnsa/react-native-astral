import { Linking } from 'react-native';

import Requests from './Requests';

export class General {
  static getUserLocation(callback, errorCallback, options) {
    let opts = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

    if (options) {
      opts = { ...opts, ...options };
    }

    navigator.geolocation.getCurrentPosition(
      callback,
      (error) => { if (errorCallback) errorCallback(error); },
      opts,
    );
  }

  static openUrl(url, errorCallback) {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      }

      return null;
    }).catch((error) => { if (errorCallback) errorCallback(error); });
  }

  static isObjectEmpty(object) {
    if (!object) {
      return true;
    }

    return Object.keys(object).every(key => object[key] === undefined);
  }

  static getValueFromObjectByPath(object, path) {
    const pathSplitted = path.split('.');
    let result = { ...object };

    for (let index = 0; index < pathSplitted.length; index += 1) {
      result = result[pathSplitted[index]];

      if (!result) break;
    }

    return result;
  }
}

export class Map {
  static GOOGLE_API_KEY = null;

  static setGoogleAPIKey(key) {
    Map.GOOGLE_API_KEY = key;
  }

  static getDirections(from, to, mode = 'driving') {
    const fromStr = `${from.latitude},${from.longitude}`;
    const toStr = `${to.latitude},${to.longitude}`;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${fromStr}&destination=${toStr}&mode=${mode}&key=${Map.GOOGLE_API_KEY}`;

    return Requests.get(url);
  }

  static getDistance(from, to) {
    const R = 6371;
    const deg2rad = deg => deg * (Math.PI / 180);
    const dLatitude = deg2rad(to.latitude - from.latitude);
    const dLongitude = deg2rad(to.longitude - from.longitude);
    const a =
      (Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2)) +
      (Math.cos(deg2rad(from.latitude)) * Math.cos(deg2rad(to.latitude)) *
      Math.sin(dLongitude / 2) * Math.sin(dLongitude / 2));

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1000;
  }

  static decodePolylineWaypoints(str, precision) {
    let index = 0;
    let latitude = 0;
    let longitude = 0;
    let shift = 0;
    let result = 0;
    let byte = null;
    let latitudeChange = null;
    let longitudeChange = null;
    const coordinates = [];
    const factor = 10 ** (precision || 5);

    while (index < str.length) {
      byte = null;
      shift = 0;
      result = 0;

      do {
        byte = str.charCodeAt(index) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
        index += 1;
      } while (byte >= 0x20);

      latitudeChange = ((result & 1) ? ~(result >> 1) : (result >> 1));
      shift = 0;
      result = 0;

      do {
        byte = str.charCodeAt(index) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
        index += 1;
      } while (byte >= 0x20);

      longitudeChange = ((result & 1) ? ~(result >> 1) : (result >> 1));

      latitude += latitudeChange;
      longitude += longitudeChange;

      coordinates.push([latitude / factor, longitude / factor]);
    }

    return coordinates;
  }

  static createCoordinatesFromPolylinePoints(polylinePoints) {
    if (!polylinePoints || polylinePoints.length === 0) {
      return [];
    }

    const steps = Map.decodePolylineWaypoints(polylinePoints);
    const polylineCoords = [];

    for (let i = 0; i < steps.length; i += 1) {
      const tempLocation = {
        latitude: steps[i][0],
        longitude: steps[i][1],
      };

      polylineCoords.push(tempLocation);
    }

    return polylineCoords;
  }
}

export default {
  General,
  Map,
};
