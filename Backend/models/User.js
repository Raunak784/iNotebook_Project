// ye ek schema hai
const mongoose = require ('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema ({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        default: Date.now
    },
 
})

// yaha schema se model create kiya jaa raha hai
module.exports = mongoose.model('user', UserSchema)

// is schema ka use hum routes me karenge