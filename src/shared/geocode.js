const request = require('postman-request');

const geoCode = (address, callback) => {
  const url =
    'http://api.mapbox.com/geocoding/v5/mapbox.places/ ' +
    encodeURIComponent(address) +
    ' .json?access_token=pk.eyJ1IjoiYmVsdGh6b3IiLCJhIjoiY2tjeXRtcDQ2MGRhNDJ5bXY0dDNwYnNrayJ9.sxP8YTOONN49zmpvaSqyhA';
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to location services', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      // when things go well
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
