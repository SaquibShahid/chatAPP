import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "User",
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "User",
        required : true
    },
    message : {
        type : String,
        required : true
    }
},
{
    timestamps: {
        currentTime: () => new Date().getTime() + 5.5 * 60 * 60 * 1000
    }
})

const Message = mongoose.model('Message', messageSchema);
export default Message;