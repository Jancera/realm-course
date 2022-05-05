import Realm from "realm";

export interface ITask {
  _id: string;
  _partition: string;
  task: string;
}

export type ITaskObject = ITask & Realm.Object;
