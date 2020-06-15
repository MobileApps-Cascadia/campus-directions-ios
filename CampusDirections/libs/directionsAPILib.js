import config from '../config';

// create a function to make a directions request
export async function callAPI(start, end) {
  // make a directions request using walking profile
  console.log("start lng: " + start[0]);
  console.log("start lat: " + start[1]);
  console.log("end lng: " + end[0]);
  console.log("end lat: " + end[1]);

  var url = 'https://api.mapbox.com/directions/v5/mapbox/walking/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + config.mapBox.ACCESS_TOKEN;

  console.log(url);
  
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