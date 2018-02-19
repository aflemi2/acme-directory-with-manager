const conn = require('./conn');
const { Sequelize } = conn;

const Employee = conn.define('employee', {
  email: {
    type: Sequelize.STRING
    //validate must be email
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

Employee.belongsTo(Employee, { as: 'Manager'});
Employee.hasMany(Employee);

Employee.createFromForm = function(body){
  if(body.managerId === '-1'){
    delete body.managerId;
  }
  return this.create(body);
}

module.exports = Employee;
