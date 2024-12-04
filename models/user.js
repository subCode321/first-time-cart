const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define the User Schema
const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});
userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null)
}
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}
// Export the User model
module.exports = mongoose.model('User', userSchema);
