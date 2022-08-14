import { enableIndexedDbPersistence } from "firebase/firestore";
import nfcManager from "react-native-nfc-manager";
import scanNfc from "../scanNfc";
import IFirebase from "../../firebase/IFirebase"
const A = () => null
jest.mock("../../database/Database")
jest.mock("react-native-nfc-manager", () => {;
  return {
    __esModule: true,
    default: {
        getTag: jest.fn(),
        requestTechnology: jest.fn(),
        start: jest.fn(),
        cancelTechnologyRequest: A
    },
    NfcTech: {
        Ndef: null
    }
  };
});
// TODO: test if it works when it shouldn't
describe("scanNfc's nfcManager functions are called the right amount of times", () => {
    it("requestTechnology is called once", async () => {
        IFirebase.getUserName.mockResolvedValue(null)
        await scanNfc({navigation: {navigate: A}, userNdef: null, setShowReading: A, setIsScanning:A})
        expect(nfcManager.start).toHaveBeenCalledTimes(1)
        expect(nfcManager.requestTechnology).toHaveBeenCalledTimes(1)
        expect(nfcManager.getTag).toHaveBeenCalledTimes(1)
    })
})
