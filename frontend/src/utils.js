export function getUsername() {
  return localStorage.getItem("username");
}

export function setUsername(token) {
  return localStorage.setItem("username", token);
}

export function getUserType() {
    return localStorage.getItem("userType");
  }
  
  export function setUserType(token) {
    return localStorage.setItem("userType", token);
  }

export function clearToken(){
    localStorage.removeItem("username");
    localStorage.removeItem("userType");
    return;
}

export function isLogined() {
  if (localStorage.getItem("username")) {
    return true;
  }
  return false;
}
