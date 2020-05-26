export default function isAuthenticate(){

    const token = localStorage.getItem('token');

    if(!token)
        return false;

    return true;

}