const conn = require('./conn');
const { Sequelize } = conn;

const Employee = conn.define('employee', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail: true
    }
  }
},
{
  getterMethods: {
    name: function(email){
      return this.email.split('@')[0];
    },
    emailProvider: function(email){
      return this.email.split('@')[1];
    }
  }
})

Employee.belongsTo(Employee, { as: 'manager'});
Employee.hasMany(Employee, {as: 'manages', foreignKey: 'managerId'});

Employee.createFromForm = function(body){
  if(body.managerId === '-1'){
    delete body.managerId;
  }
  return Employee.create(body);
}

Employee.updateFromForm = function(body){
  if(body.managerId === '-1'){
    body.managerId = null;
  }
  return Employee.findById(id)
  .then (employee => {
    Object.assign(employee, body);
    return employee.save();
  })
}

module.exports = Employee;
