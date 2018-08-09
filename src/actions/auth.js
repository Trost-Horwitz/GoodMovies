export const signin = ({ user }) => ({
  type: "SIGNIN",
  payload: {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified
  }
});

export const signout = () => ({
  type: "SIGNOUT"
});
