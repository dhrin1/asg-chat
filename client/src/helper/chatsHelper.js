import axios from "axios";

export const getSearch = async ({ keyword, user }) => {
    try {
        
        const { data } = await axios.get(`/user?search=${keyword}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        return data
    } catch (error) {
        console.log(error.message)
    }
} 

export const newChats = async ({ userId, user }) => {
    try {
        const {data} = await axios.post('/chat', { userId }, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`
            }
        });
        return data
    } catch (error) {
        console.log(error.message)
    }
}

export const getChats = async ({ user }) => {
    try {
        const { data } = await axios.get('/chat', {
            headers: {
                Authorization: `Bearer ${user.token}` 
            }
        });
        return data
    } catch (error) {
        console.log(error)
    }
} 

