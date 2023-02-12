import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  getDoc,
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import * as fs from "fs";
const PROJECT_ID = "iurn-973d0";
let testEnv: RulesTestEnvironment;
describe("Firestore security rules", () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        rules: fs.readFileSync(__dirname + "/../firestore.rules", "utf-8"),
        host: "127.0.0.1",
        port: 8080,
      },
    });
  });
  beforeEach(async () => {
    testEnv.clearFirestore();
  });
  it("allows user information to be read and queried when there is a true 'Published' property and a false 'Private' property", async () => {
    const db = testEnv.authenticatedContext("user123").firestore();
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const admin = context.firestore();
      const docref = doc(admin, "Pages", "1");
      await setDoc(docref, {
        DummyData: "John Doe",
        Published: true,
        Private: false,
      });
    });
    const docref = doc(db, "Pages", "1");
    expect(assertSucceeds(getDoc(docref))).resolves.toBeTruthy();
    expect(
      assertSucceeds(
        getDocs(query(collection(db, "Pages"), where("Private", "==", false)))
      )
    ).resolves.toBeTruthy();
  });
  it("DOES NOT allow page to be read or queried when there is a false 'Published' property", async () => {
    const db = testEnv.authenticatedContext("user123").firestore();
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const admin = context.firestore();
      const docref = doc(admin, "Pages", "1");
      await setDoc(docref, {
        Name: "John Doe",
        Published: false,
      });
    });
    const docref = doc(db, "Pages", "1");
    expect(assertFails(getDoc(docref))).resolves.toBeTruthy();
    expect(assertFails(getDocs(collection(db, "Pages")))).resolves.toBeTruthy();
  });
  it("allows user to access, query, and update their own information even if 'Private' property is true", async () => {
    const db = testEnv.authenticatedContext("user123").firestore();
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const admin = context.firestore();
      await setDoc(doc(admin, "Pages", "1"), {
        Name: "John Doe",
        Private: true,
        Owner: "user123",
      });
    });
    const docref = doc(db, "Pages", "1");
    expect(
      assertSucceeds(
        getDocs(query(collection(db, "Pages"), where("Private", "==", false)))
      )
    ).resolves.toBeTruthy();
    expect(assertSucceeds(getDoc(docref))).resolves.toBeTruthy();
    expect(
      assertSucceeds(
        setDoc(docref, {
          Name: "Jane Doe",
          Private: false,
          Published: true,
          Owner: "user123",
          Collaborators: ["user123"],
        })
      )
    ).resolves.toBeTruthy();
    expect(
      assertSucceeds(
        setDoc(docref, {
          Name: "Jane Doe",
          Private: false,
          Published: true,
          Owner: "user123",
          Collaborators: ["user123", "user234"],
        })
      )
    ).resolves.toBeTruthy();
    expect(
      assertSucceeds(
        setDoc(docref, {
          Name: "Jane Doe",
          Private: false,
          Published: true,
          Owner: "JohnDoe",
        })
      )
    ).resolves.toBeTruthy();
  });

  it("allows user to access, query, and update their own information even if 'Published' property is false", async () => {
    const db = testEnv.authenticatedContext("user123").firestore();
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const admin = context.firestore();
      await setDoc(doc(admin, "Pages", "user123"), {
        Name: "John Doe",
        Private: true,
        Published: false,
        Owner: "user123",
      });
    });
    const docref = doc(db, "Pages", "user123");
    expect(
      assertSucceeds(
        getDocs(query(collection(db, "Pages"), where("Private", "==", false)))
      )
    ).resolves.toBeTruthy();
    expect(assertSucceeds(getDoc(docref))).resolves.toBeTruthy();
    expect(
      assertSucceeds(
        setDoc(docref, {
          Name: "Jane Doe",
          Private: true,
          Published: false,
          Owner: "user123",
          Collaborators: ["user123"],
        })
      )
    ).resolves.toBeTruthy();
    expect(
      assertSucceeds(
        setDoc(docref, {
          Name: "Jane Doe",
          Private: true,
          Published: false,
          Owner: "user123",
          Collaborators: ["user123", "user234"],
        })
      )
    ).resolves.toBeTruthy();
    expect(
      assertSucceeds(
        setDoc(docref, {
          Name: "Jane Doe",
          Private: false,
          Published: true,
          Owner: "JohnDoe",
        })
      )
    ).resolves.toBeTruthy();
  });

  it("allows collaborators to change information as long as it's not the 'Collaborators' array or the 'Owner' property", async () => {
    const db = testEnv.authenticatedContext("user123").firestore();
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const admin = context.firestore();
      const docref = doc(admin, "Pages", "1");
      await setDoc(docref, {
        Name: "John Doe",
        Private: true,
        Published: false,
        Collaborators: ["user123"],
      });
    });
    const docref = doc(db, "Pages", "1");
    expect(assertSucceeds(getDoc(docref))).resolves.toBeTruthy();
    expect(
      assertSucceeds(
        getDocs(query(collection(db, "Pages"), where("Private", "==", false)))
      )
    ).resolves.toBeTruthy();
    expect(
      assertSucceeds(
        setDoc(docref, {
          Name: "Jane Doe",
          Private: false,
          Published: true,
          Collaborators: ["user123"],
        })
      )
    ).resolves.toBeTruthy();
    expect(
      assertFails(
        setDoc(docref, {
          Name: "Jane Doe",
          Private: false,
          Published: true,
          Collaborators: ["user123", "user234"],
        })
      )
    ).resolves.toBeTruthy();
    expect(
      assertFails(
        setDoc(docref, {
          Name: "Jane Doe",
          Private: false,
          Published: true,
          Owner: "JohnDoe",
        })
      )
    ).resolves.toBeTruthy();
  });
  it("DOES NOT allow user to access data when not authenticated", async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const admin = context.firestore();
      const docref = doc(admin, "Pages", "1");
      await setDoc(docref, {
        Name: "John Doe",
        Published: true,
      });
    });
    const docref = doc(db, "Pages", "1");
    expect(assertFails(getDoc(docref))).resolves.toBeTruthy();
    expect(
      assertFails(
        getDocs(query(collection(db, "Pages"), where("Private", "==", false)))
      )
    ).resolves.toBeTruthy();
    expect(
      assertFails(
        setDoc(docref, {
          Name: "Jane Doe",
          Private: false,
          Published: true,
          Collaborators: ["user123"],
        })
      )
    ).resolves.toBeTruthy();
  });
  it("allows user to get page only when there is a true 'Published' property and when the user is authenticated", async () => {
    const db = testEnv.authenticatedContext("user123").firestore();
    const noAuthDB = testEnv.unauthenticatedContext().firestore();
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const admin = context.firestore();
      const docref = doc(admin, "Pages", "1");
      await setDoc(docref, {
        Name: "John Doe",
        Published: true,
      });
    });
    const docref = doc(db, "Pages", "1");
    const noAuthDocRef = doc(noAuthDB, "Pages", "1");
    expect(assertSucceeds(getDoc(docref))).resolves.toBeTruthy();
    expect(assertFails(getDoc(noAuthDocRef))).resolves.toBeTruthy();
  });
  afterAll(async () => {
    testEnv.cleanup();
  });
});
