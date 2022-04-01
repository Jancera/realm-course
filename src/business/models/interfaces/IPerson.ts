import { IDog } from "./IDog";

export interface IPerson {
  name: string;
  age?: number;
  dog?: Partial<IDog>;
}
