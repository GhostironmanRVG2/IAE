var distance = require('distance-matrix-api');
  
distance.key=('AIzaSyDqKiSS3R0yVZvedwN2YQE4LPZDOjEqdYM');
function getLatLong(req, res){
 
  var origins = ['San Francisco CA'];
var destinations = ['New York NY', '41.8337329,-87.7321554'];
 
distance.matrix(origins, destinations, function (err, distances) {
    if (!err)
        console.log(distances);
})
  
}




module.exports={
getLatLong: getLatLong,

}