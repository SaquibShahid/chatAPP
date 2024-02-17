import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { receiverId } = req.params;
    const senderId = req.user._id;
    const sender = await User.find({ _id: senderId }).select({ _id: 1 });
    if (!sender) {
      return res.status(500).json({ error: "sender not found" });
    }
    const receiver = await User.find({ _id: receiverId }).select({ _id: 1 });
    if (!receiver) {
      return res.status(500).json({ error: "receiver not found" });
    }

    let conservation = await Conversation.findOne({
      participants: { $all: [sender.id, receiverId] },
    });
    if (!conservation) {
      conservation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      message,
      senderId,
      receiverId,
    });
    if (newMessage) {
      conservation.messages.push(newMessage._id);
    }
    // await newMessage.save();
    // await conservation.save();

    await Promise.all([conservation.save(), newMessage.save()]); // this will run in parallel
    return res.status(200).json(newMessage);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
export const getMessages = async (req, res) => {
  try {
    const receiverId = req.params.receiverId;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
        participants : {$all : [senderId, receiverId]},
    }).populate({
        path : "messages",
        select : {
            __v:0
        }
    }).select({__v:0});

    if(!conversation){
        return res.status(500).json({ message : "no conversation found" });
    }

    return res.status(200).json(conversation.messages);

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
