import { ObjectSchema } from "realm";

const DogSchema: ObjectSchema = {
  name: "Dog",
  properties: {
    name: "string",
    age: "int?",
  },
  primaryKey: "name",
};

export default DogSchema;
