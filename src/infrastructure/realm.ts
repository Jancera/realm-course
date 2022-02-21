import Realm from "realm";
import TaskSchema from "../business/models/Task";

const getRealm = async () =>
  await Realm.open({
    path: "myrealm",
    schema: [TaskSchema],
  });

export default getRealm;
