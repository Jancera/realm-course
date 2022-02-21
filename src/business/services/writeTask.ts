import getRealm from "../../infrastructure/realm";
import { ITask, ITaskObject } from "../models/interfaces/ITask";

let createdTask: ITaskObject;
const writeTask = async (data: ITask) => {
  const realm = await getRealm();

  realm.write(() => {
    createdTask = realm.create("Task", data);
  });

  return createdTask;
};

export default writeTask;
