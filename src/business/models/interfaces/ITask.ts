import Realm from "realm";

export interface ITask {
  _id: number;
  name: string;
  status?: string;
}

export type ITaskObject = ITask & Realm.Object;
