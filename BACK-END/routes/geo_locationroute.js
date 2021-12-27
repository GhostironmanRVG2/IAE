const {app}=require('../server');
const { getLatLong } = require('../controllers/geo_location_controller');


app.get("/geoloc",getLatLong);