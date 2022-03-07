import getRealm from "../../infrastructure/realm";
import { ITask } from "../models/interfaces/ITask";

const getAllTasks = async () => {
  const realm = await getRealm();

  return realm.objects<ITask>("Task");
};

export default getAllTasks;
