const selectEmailAndCallback = ({ stateFetchUser }) =>
  stateFetchUser.emailAndCallBack;
const selectUserData = ({ stateFetchUser }) => stateFetchUser.userData;

export { selectEmailAndCallback, selectUserData };
