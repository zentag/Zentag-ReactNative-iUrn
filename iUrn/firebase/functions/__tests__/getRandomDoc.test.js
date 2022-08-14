import { getDocs } from "firebase/firestore";
import getRandomDoc from "../getRandomMemory/getRandomDoc";
jest.mock("firebase/firestore", () => {
    const originalModule = jest.requireActual('firebase/firestore');
  return {
    __esModule: true,
    ...originalModule,
   getDocs: jest.fn(() => {return {empty:true}}),
   collection: () => null,
   query: () => null
  };
})

describe("getRandomMemory>getRandomDoc works well", () => {
    it("returns null if no docs", async () => {
        expect(await getRandomDoc()).toBe(null)
    })
    it("getDocs is called twice", () => {
        expect(getDocs).toHaveBeenCalledTimes(2)
    })
})