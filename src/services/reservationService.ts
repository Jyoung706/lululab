import reservationDao from "../models/reservationDao";

const possibleListService = async () => {
  return await reservationDao.getPossibleList();
};

export default { possibleListService };
