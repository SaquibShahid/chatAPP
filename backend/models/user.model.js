import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    username : {type : String, required: true ,unique : true},
    fullName : {type : String, required: true },
    password : {type : String, required: true , minlength : 6},
    gender : {type : String, required: true , enum : ['male', 'female']},
    profilePic : {type : String, default : ""},
},
{
    timestamps: {
        currentTime: () => new Date().getTime() + 5.5 * 60 * 60 * 1000
    }
})

const User = mongoose.model('User', schema);
export default User;
