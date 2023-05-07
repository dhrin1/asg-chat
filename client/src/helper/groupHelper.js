import axios from "axios";

export const createGroup = async ({name, members, user}) => {
    try {
        const { data } = await axios.post("/chat/group", {
            name: name,
            users: members
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            }
        });
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const updateGroup = async ({ id, name, member, user, entry }) => {
    switch (entry) {
        case "name":
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
                const { data } = await axios.put("/chat/rename", {
                    chatId: id,
                    chatName: name,
                },config);
                return data;
            } catch (error) {
                console.log(error.message)        
            }
            break;
        case "member":
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
                const { data } = await axios.put("/chat/groupadd", {
                    chatId: id,
                    userId: member._id,
                },config);
                return data;
            } catch (error) {
                console.log(error.message)        
            }
            break
        default:
            break;
    }
}

export const removeUser = async ({ id, member, user }) => {
    try {
        const { data } = await axios.put("/chat/groupremove", {
            chatId: id,
            userId: member._id
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        return data;
    } catch (error) {
        console.log(error.message)
    }
}