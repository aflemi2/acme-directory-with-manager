const express = require("express");
const app = express();
const db = require('./db');
const { Employee } = db.model;
const path =require('path');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded());
app.use(require('method-override')('_method'));

app.use('/', require('./routes'));

app.use((err, req, res, next)=>{
  console.log(err + 'HEEERRREEE');
  res.send('You have made an error')
})

db.sync()
.then(()=>db.seed())

const port= process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on '+ port)
});


