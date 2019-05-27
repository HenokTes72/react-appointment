const selectName = ({ stateFetchNames }) => stateFetchNames.name;
const selectNamedUsersData = ({ stateFetchNames }) =>
  stateFetchNames.namedUsersData;

export { selectName, selectNamedUsersData };
