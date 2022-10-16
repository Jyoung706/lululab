import { myDataSource } from "../typeorm/typeorm";
import { NotExistError, UnAuthorizedError } from "../middleware/error_creator";

export const validateUser = async (id: number) => {
  const [data] = await myDataSource.query(
    `SELECT id, is_active FROM users WHERE id = ?;
  `,
    [id]
  );
  if (!data) {
    throw new NotExistError("does not exist user");
  }
  if (data.is_active === 0) {
    throw new UnAuthorizedError("service banned user or withdrawal user");
  }
  return;
};
