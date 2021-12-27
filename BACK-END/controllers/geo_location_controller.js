const NodeGeocoder = require('node-geocoder');
const geolib = require('geolib');

var options = {
    provider: 'google',
  
    // Optionnal depending of the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyAZ9ZOzUtovxO0cbG4OVHAWRO2hv_Ja07g', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };

  

function getLatLong(req, res){
    var r='Porto Portugal';
    var r2='Lisboa espanha'
    
    var geocoder = NodeGeocoder(options);

    // Using callback
    geocoder.geocode(r, function(err, response) {
    
      geocoder.geocode(r2, function(err, responsedois){

    var x=geolib.getDistance(
        { latitude: response[0].latitude, longitude: response[0].longitude },
        { latitude: responsedois[0].latitude, longitude: responsedois[0].longitude }
    );
    res.send((x/1000).toString());
      });
    });


}





module.exports={
getLatLong: getLatLong,

}