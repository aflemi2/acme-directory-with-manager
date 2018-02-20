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


app.use((req, res, next)=>{
Employee.findAll()
.then( employees=> {
  res.locals.employeeCount = employees.length;
  next()
})
.catch(next)
})

app.use('/', require('./routes'));



db.sync()
.then(()=>db.seed())

const port= process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on '+ port)
});


