export  const getInfo = (user, item, entry) => {
    let data = null
    switch (entry) {
        case "single":
            data =  item[0]?._id === user._id ? { name: item[1]?.name, image: item[1]?.image, email: item[1]?.email } : { name: item[0]?.name, image: item[0]?.image, email: item[0]?.email };
            break;
        case "all":
            data =  item[0]?._id === user._id ?  item[1]:  item[0];
            break;
        default:
            break;
    }
    return data   
}

export const isSender = (messages, m, i, userId) => {
    return (
        i < messages.length - 1 &&
        (messages[i+1].sender._id !== m.sender._id || messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    )
}

export const isLastMsg = (messages, i, userId) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId && 
        messages[messages.length - 1].sender._id
    )
}

export const setSenderMagin = (messages, m, i, userId) => {
    if (i < messages.length - 1 &&messages[i + 1].sender._id === m.sender._id && messages[i].sender._id !== userId)
        return 45;
    else if ((i < messages.length - 1 && messages[i + 1].sender._id !== m.sender._id && messages[i].sender._id !== userId) || (i === messages.length - 1 && messages[i].sender._id !== userId))
        return 0;
    else return "auto";
}

export const isSenderUser = (messages, m, i, userId) => {
    return (i < messages.length - 1 && (messages[i + 1].sender._id !== m.sender._id || messages[i + 1].sender._id === undefined) && messages[i].sender._id !== userId);
}