const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if(!userId){
        console.log("Parameter is not found!");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    })
    .populate("users", "-password")
    .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: "name image email",
    });

    if(isChat.length > 0) {
        res.send(isChat[0]);
    }else{
        var data = {
            chatName: "sender",
            isGroup: false,
            users: [req.user._id, userId],
        }
    }

    try {
        const newChat = await Chat.create(data);
        const full = await Chat.findOne({ _id: newChat._id }).populate("users", "-password");
        res.status(200).send(full);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const fetchChats = asyncHandler(async (req, res)=>{
    try {
        Chat.find({users: {$elemMatch: {$eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({updatedAt: -1})
        .then(async(results)=>{
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name image email",
            });

            res.status(200).send(results)
        })
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
});

const createGroupChat = asyncHandler(async(req, res)=>{
    if(!req.body.users || !req.body.name ) {
        return res.status(400).send({ message: "Please complete all fields" });
    }
    var users = JSON.parse(req.body.users);

    users.push(req.user);

    if(users.length < 2) {
        return res.status(400).send("More than 2 users are required to form a group chat");
    }
    

    try {
        const group = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroup: true,
            groupAdmin: req.user,
        });

        const fullGroup = await Chat.findOne({_id: group._id})
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        res.status(200).json(fullGroup);
    } catch (error) {
        res.status(400)
        throw new Error(error.message);
    }
});

const renameGroup = asyncHandler(async(req, res)=>{
    const {chatId, chatName} = req.body;
    const updateChat = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!updateChat){
        res.status(404);
        throw new Error("Chat not found.");
    }else{
        res.json(updateChat)
    }
});

const addToGroup = asyncHandler(async(req, res)=>{
    const {chatId, userId} = req.body;

    const newUsers = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId }, }, {new: true})
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!newUsers){
        res.status(404);
        throw new Error("Chat not found.");
    }else{
        res.json(newUsers)
    }

});

const removeFromGroup = asyncHandler(async(req, res)=>{
    const {chatId, userId} = req.body;
    
    const removeUsers = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId }, }, {new: true})
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!removeUsers){
        res.status(404);
        throw new Error("Chat not found.");
    }else{
        res.json(removeUsers)
    }

})

module.exports = {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup
}