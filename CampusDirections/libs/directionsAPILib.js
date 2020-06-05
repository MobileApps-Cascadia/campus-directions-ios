import config from '../config';

// create a function to make a directions request
export async function getDirections(start, end) {
  // make a directions request using walking profile
  var url = 'https://api.mapbox.com/directions/v5/mapbox/walking/' + start[0] + ',' + start[1] + ';-122.227776,47.851899' + '?steps=true&geometries=geojson&access_token=' + config.mapBox.ACCESS_TOKEN;

  try {
    let response = await fetch(
      url, {
      method: 'GET'
    });
    // console.log("MapBox API URI:")
    // console.log(url);
    let json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};