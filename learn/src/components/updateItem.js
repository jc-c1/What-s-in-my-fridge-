import React, { useState } from "react";
import { db } from "../config/firebase";
import { updateDoc, doc } from "firebase/firestore";

export const UpdateItem = ({ id, onUpdate }) => {
    const [update, setUpdate] = useState("");

    const handleUpdate = async (id) => {
        const itemRef = doc(db, "inventories", id);
        await updateDoc(itemRef, { name: update });
        onUpdate(false);
    };

    return (
        <>
            <input placeholder="Name" onChange={(e) => setUpdate(e.target.value)} />
            <button onClick={() => handleUpdate(id)}>Submit</button>
        </>
    );
};


