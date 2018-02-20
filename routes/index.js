const router = require('express').Router();
const db = require('../db')
const { Employee } = db.model;
module.exports = router;

router.get('/', (req, res, next)=>{
   res.render('index');
});

router.get('/employees', (req, res, next)=>{
  Employee.findAll({ include: [ Employee ]})
  .then(employees => res.render('employees', { employees }))
  .catch(next)
});

router.post('/employees', (req, res, next)=>{
  Employee.createFromForm(req.body)
  .then(()=>res.redirect('/employees'))
  .catch(next)
})
