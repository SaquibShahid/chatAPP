import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    ],
    messages : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Message",
            default : [],
        }
    ]
},
{
    timestamps: {
        currentTime: () => new Date().getTime() + 5.5 * 60 * 60 * 1000
    }
});

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;