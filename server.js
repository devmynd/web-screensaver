var express = require('express');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 8000));

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/public', 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log('DevMynd web screensaver is up!');
});
