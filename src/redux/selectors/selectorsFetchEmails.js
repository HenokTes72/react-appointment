const selectQuery = ({ stateFetchEmails }) => stateFetchEmails.query;
const selectEmails = ({ stateFetchEmails }) => stateFetchEmails.emails;

export { selectQuery, selectEmails };
