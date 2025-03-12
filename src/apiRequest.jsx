const apiRequest = async (url = "", optionsObj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optionsObj);
        if (!response.ok) throw Error("Request failed");  
        if (optionsObj && optionsObj.method === "DELETE") return null;
        
        return await response.json();
    } catch (err) {
        errMsg = err.message;
    }
    return errMsg;
};

export default apiRequest;
