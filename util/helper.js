const jwt =  require("jsonwebtoken");

 const generateTokenAndSetCookie = (res, user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      profile: user.profile,
      bio: user.bio,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

module.exports = generateTokenAndSetCookie;
