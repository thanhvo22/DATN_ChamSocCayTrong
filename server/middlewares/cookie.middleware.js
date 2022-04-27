export const cookieMiddleWare = function (req, res, next) {
  console.log("id_user:", req.signedCookies.cookie_id);
  if (req.signedCookies.cookie_id) {
    next();
    return;
  }
  // return res.json("cookie k ton tai, vui long dang nhap lai ");
//   return res.redirect("auth/login");
  return res.json({message: "chuaw cos cookie, dang nhap di :))"});
};
