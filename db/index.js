const conn = require('./conn');
const Employee = require('./Employee');


const sync = ()=>{
return conn.sync({ force: true });
}

const seed = ()=>{
  return Promise.all([
    Employee.create({ email: 'moe@gmail.com'}),
    Employee.create({ email: 'larry@gmail.com'}),
    Employee.create({ email: 'curly@gmail.com'}),
  ])
  .then(([moe, larry, curly])=>{
    return Promise.all([
     curly.setManager(moe),
     larry.setManager(moe)
  ])
  })

}

module.exports = {
  sync,
  seed,
  model: {
    Employee
  }
}
