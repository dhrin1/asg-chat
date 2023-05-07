import axios from "axios";

export const getSendMessage = async ({ req, id, user }) => {
    try {   
        const { data } = await axios.post('/message', {
            content: req.content,
            chatId: id
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            }
        });
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getAllMessage = async ({ chatId, user }) => {
    try {
        const { data } = await axios.get(`/message/${chatId}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        return data;
    } catch (error) {
        console.log(error)
    }
}