import { ObjectSchema } from "realm";

const PersonSchema: ObjectSchema = {
  name: "Person",
  properties: {
    name: "string",
    age: "int",
    dog: "Dog?",
  },
  // primaryKey: "name",
};

export default PersonSchema;
