import { Auth } from "firebase/auth";
import { collection, doc, Firestore, getDoc } from "firebase/firestore";

export default function setupCheck(auth:Auth, db:Firestore){
    return async function setupCheck() {
        // an empty array is returned to signify that the account does not have an iUrn page
        let array = [{display:"New Memory", redirect:"AddMemory"}]
        const user = auth.currentUser
        if(!user) return []
        const ref = doc(db, "Users", user.uid)
        const docSnap = await getDoc(ref)
        if(!docSnap.exists()) return []
        const data = docSnap.data()
        if(!data.Name) array.push({display: "Add name", redirect: "AddName"})
        else array.push({display: "Edit name", redirect: "AddName"})
        if(!data.Memorial) array.push({display: "Add memorial", redirect: "AddMemorial"})
        else array.push({display: "Edit memorial", redirect: "AddMemorial"})
        return array
    }
}