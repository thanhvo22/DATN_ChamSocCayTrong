export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("userId"));
    if (user) {
    //   return { Authorization: 'Bearer ' + user.accessToken };
      return { "x-auth-token": user };
    } else {
      return {};
    }
  }