import React from "react";
import { db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const DeleteItem = ({ id }) => {
    const handleDelete = async () => {
        const itemRef = doc(db, "inventories", id);
        await deleteDoc(itemRef);
    };

    return <button onClick={handleDelete}>Delete</button>;
};

