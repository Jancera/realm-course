import Realm from "realm";
import DogSchema from "../business/models/Dog";
import PersonSchema from "../business/models/Person";

const getRealm = async () =>
  await Realm.open({
    path: "myrealm",
    schema: [PersonSchema, DogSchema],
  });

export default getRealm;
