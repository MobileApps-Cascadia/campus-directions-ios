import config from '../config';

// create a function to make a directions request
export async function getDirections(start, end) {
  // make a directions request using walking profile
  var url = 'https://api.mapbox.com/directions/v5/mapbox/walking/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + config.mapBox.ACCESS_TOKEN;

  try {
    let response = await fetch(
      url, {
      method: 'GET'
    });
    console.log(url);
    let json = await response.json();

    var steps = json.routes[0].legs[0].steps;

    var tripInstructions = [];

    console.log(json);
    console.log("");
    console.log(steps);

    return json;
  } catch (error) {
    console.error(error);
  }
};