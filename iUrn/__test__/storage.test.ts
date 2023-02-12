import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  deleteObject,
  ref,
  uploadBytes,
} from "firebase/storage";
import * as fs from "fs";
const PROJECT_ID = "iurn-973d0";
let testEnv: RulesTestEnvironment;

describe("Firebase storage security rules", () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        rules: fs.readFileSync(__dirname + "/../storage.rules", "utf-8"),
        host: "127.0.0.1",
        port: 9199,
      },
    });
  });
  beforeEach(async () => {
    if(!testEnv) return
    testEnv.clearStorage();
  });

  it("DOES NOT allow deletion", async () => {
    if(!testEnv) return
    const storage = testEnv.authenticatedContext("user123").storage();
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await uploadBytes(ref(context.storage(), "hi.jpg"), require("../assets/images/placeholder.png"))
    })
    expect(assertFails(deleteObject(ref(storage, "hi.jpg")))).resolves.toBeTruthy()
  })

  afterAll(async () => {
    if(!testEnv) return
    testEnv.cleanup();
  });
});
