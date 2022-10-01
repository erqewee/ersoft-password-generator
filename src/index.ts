import { Password, Personalize, Positions, SaveTypes } from "./export";

const gen: Password = new Password({ length: 248 });
const p = gen.generate({});
console.log(p)