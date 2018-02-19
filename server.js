const express = require("express");
const app = express();
const db = require('./db')
const { Employee } = db.model;
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded());
app.get('/employees', (req, res, next)=>{
  return Employee.findAll({ include: [ Employee ]})
  .then(employees => res.render('employees', { employees }))
  .catch(next)
});

app.post('/employees', (req, res, next)=>{
  Employee.createFromForm(req.body)
  .then(()=>res.redirect('/employees'))
  .catch(next)
})

db.sync()
.then(()=>db.seed())

const port= process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on '+ port)
});


