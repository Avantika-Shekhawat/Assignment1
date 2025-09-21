import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    Email : {
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Username:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

export default mongoose.model('user', UserSchema);