const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname)));
app.use('/assets', express.static(__dirname + '/assets/scripts'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + 'views/index.html'));
});

app.listen(process.env.PORT || 8080);
