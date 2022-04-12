import { ObjectSchema } from "realm";

const DogSchema: ObjectSchema = {
  name: "Dog",
  properties: {
    id: "int",
    name: "string",
    age: "int?",
  },
  primaryKey: "id",
};

export default DogSchema;
