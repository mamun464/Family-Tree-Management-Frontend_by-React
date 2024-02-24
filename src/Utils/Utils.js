export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem('access_token');
    // console.log(token);
    return token;

};
export const getProfileLocalStorage = () => {
    const user = localStorage.getItem('user');
    // console.log(token);
    return JSON.parse(user);

};