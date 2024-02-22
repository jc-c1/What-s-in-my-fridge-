import { db, auth } from "../config/firebase";
import {
    onSnapshot, collection, query, where
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { Items } from "./item";
import { GeminiComponent } from "./recipeGeneration"
import { onAuthStateChanged } from "firebase/auth"


export const Inventory = () => {
    const [inventoryList, setInventoryList] = useState([]);

    //const [ingredients, setCheck] = useState([]);
    let checkedItems = [];

    const handleCheck = (isChecked, item) => {
        try {
            if (isChecked === true) {
                checkedItems.push(item)

            } else {
                checkedItems = checkedItems.filter(i => i !== item)
            }
        } catch (err) {
            console.error(err)
        }
    };



    useEffect(() => {
        // Register firebase listeners
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const invCol = collection(db, "inventories")
                const userInv = query(invCol, where("uid", "==", auth.currentUser.uid));
                const unsub = onSnapshot(userInv, (item) => {
                    const qItems = item.docs.map((item) => ({
                        ...item.data(),
                        id: item.id,
                    }));
                    setInventoryList(qItems)
                });


                return () => unsub()
            } else {
                setInventoryList([])
            }
        })

    }, []) // Need an empty dependency array to make sure we only run when component first mounts

    // useEffect(() => {
    //     setCheck(checkedItems)
    // }, [])


    return (
        <div>
            {inventoryList.map((item) => (
                <Items key={item.id} item={item} handleCheck={handleCheck} />
            ))}

            <div style={{ marginTop: "15px" }}>
                <GeminiComponent ing={checkedItems} />
            </div>

        </div>
    );


}

