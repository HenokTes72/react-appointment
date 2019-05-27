const selectIsFetchPlacesProfessionalsLoading = ({
  stateFetchPlacesAndProfessionals
}) => stateFetchPlacesAndProfessionals.isBasicsLoading;

const selectIsFetchPlacesProfessionalsError = ({
  stateFetchPlacesAndProfessionals
}) => stateFetchPlacesAndProfessionals.isBasicsError;

const selectInstitutionData = ({ stateFetchPlacesAndProfessionals }) =>
  stateFetchPlacesAndProfessionals.institutionData;

export {
  selectIsFetchPlacesProfessionalsLoading,
  selectIsFetchPlacesProfessionalsError,
  selectInstitutionData
};
