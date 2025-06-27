import React, { useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebase";

function FirestoreTest() {
  useEffect(() => {
    async function testFirestore() {
      try {
        const docRef = await addDoc(collection(db, "testCollection"), {
          testField: "Hello from Dashboard!",
          timestamp: new Date(),
        });
        console.log("Document written with ID:", docRef.id);

        const querySnapshot = await getDocs(collection(db, "testCollection"));
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });

        console.log("Firestore is linked and working!");
      } catch (error) {
        console.error("Error testing Firestore: ", error);
      }
    }

    testFirestore();
  }, []);

  return null; // no UI needed, just a background test
}

export default FirestoreTest;
