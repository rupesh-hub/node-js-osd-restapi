const jwt =  require("jsonwebtoken");

 const generateTokenAndSetCookie = (res, user) => {
  const secret_key = process.env.SECRET_KEY || '12345678910'; // may not be good way to do this
  
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      profile: user.profile,
      bio: user.bio,
    },
    secret_key,
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
