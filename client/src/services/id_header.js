export default function id_header() {
  const user = localStorage.getItem("_id");
  if (user) {
    //   return { Authorization: 'Bearer ' + user.accessToken };
    return { userId: user };
  } else {
    return {};
  }
}
