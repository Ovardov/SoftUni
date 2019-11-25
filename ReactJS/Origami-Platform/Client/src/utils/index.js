function parseCookies() {
    return document.cookie.split('; ')
      .reduce((acc, cookie) => {
        const [cookieName, cookieValue] = cookie.split('=');
        acc[cookieName] = cookieValue;
  
        return acc;
      }, {});
}

function isLogged() {
    const cookies = parseCookies();
    
    return !!cookies['x-auth-token'];
}

export default {
  parseCookies,
  isLogged
}