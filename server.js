const express = require('express');
const app = express();
const user = require('./routes/user');
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/api/v1', user);

//READ Request Handlers
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
 

 
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}..`));