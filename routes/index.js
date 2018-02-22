const router = require('express').Router();
const db = require('../db')
const { Employee } = db.model;
module.exports = router;


router.use((req, res, next)=>{
Employee.findAll({
  include: [
  { model: Employee, as: 'manages'}
  ]
})
.then( employees => {

  res.locals.managerCount = employees.length;
  next()
})
.catch(next)
})

router.use((req, res, next)=>{
  Employee.findAll()
  .then( employees => {
    res.locals.employeeCount = employees.length;
    next();
  })
  .catch(next)
})

router.get('/', (req, res, next)=>{
   res.render('index');
});

router.get('/employees', (req, res, next)=>{
  Employee.findAll({
    order: [['email', 'ASC']],
    include: [
    { model: Employee, as: 'manager' },
    { model: Employee, as: 'manages' }
    ]
  })
  .then(employees => res.render('employees', { employees }))
  .catch(next)
});

router.post('/employees', (req, res, next)=>{
  Employee.createFromForm(req.body)
  .then(()=>res.redirect('/employees'))
  .catch(next)
})

router.put('/employees/:id', (req, res, next)=>{
  Employee.updateFromForm(res.params.id, req.body)
  .then(()=> res.redirect('/employees'))
  .catch(next);
})

router.delete('/employees', (req, res, next)=>{
  Employee.findById(req.params.id)
  .then( employee => employee.destroy())
  .then( ()=> res.redirect('/employees'))
  .catch(next);
})
