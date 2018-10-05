//Install express server
const express = require('express');
const path = require('path');

const app = express();
//User validation
var auth = express.basicAuth(function(user, pass) {
    return (user == "cts" && pass == "admin") ? true : false;
}, 'dev area');


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/flight-app'));

app.get('/*', auth, function(req, res) {

    res.sendFile(path.join(__dirname + '/dist/flight-app/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);