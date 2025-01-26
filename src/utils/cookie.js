export const setCookie = (name, value, hours) => {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000); 
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`; 
};


export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

export const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
