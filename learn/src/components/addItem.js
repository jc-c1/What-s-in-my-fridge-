import { db, auth } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import CreatableSelect from 'react-select/creatable';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const AddItem = () => {
    const invCol = collection(db, "inventories");

    const [newItemName, setNewName] = useState("");
    const [newItemQty, setNewQty] = useState(0);
    const [newItemUnit, setNewUnit] = useState("");
    const [newItemExpiry, setNewExpiry] = useState(new Date());

    const unitOptions = [
        { value: 'count', label: 'count' },
        { value: 'g', label: 'g' },
        { value: 'mL', label: 'mL' },
    ];

    const onAddItem = async () => {
        try {
            // Do nothing if any required field is empty
            if (!newItemName || !newItemQty || !newItemUnit || !newItemExpiry) return;
            
            // Add item to Firestore collection
            await addDoc(invCol, {
                name: newItemName,
                quantity: newItemQty,
                unit: newItemUnit,
                expiry: newItemExpiry,
                entryDate: serverTimestamp(),
                uid: auth?.currentUser?.uid,
            });

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <input placeholder="Name" onChange={(e) => setNewName(e.target.value)} />
            <input placeholder="Quantity" type="number" onChange={(e) => setNewQty(Number(e.target.value))} />
            <CreatableSelect isClearable options={unitOptions} onChange={(e) => setNewUnit(e.value)} />
            <DatePicker selected={newItemExpiry} onChange={(date) => setNewExpiry(date)} />
            <button onClick={onAddItem}>Add</button>

        </div>
    );
};





// import { db, auth } from "../config/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { useState } from "react"
// import CreatableSelect from 'react-select/creatable';
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";

// export const AddItem = () => {

//     const invCol = collection(db, "inventories");

//     const [newItemName, setNewName] = useState("");
//     const [newItemQty, setNewQty] = useState(0);
//     const [newItemUnit, setNewUnit] = useState("");
//     const [newItemExpiry, setNewExpiry] = useState(new Date());

//     const unitOptions = [
//         { value: 'count', label: 'count' },
//         { value: 'g', label: 'g' },
//         { value: 'mL', label: 'mL' },
//     ];

//     const onAddItem = async () => {
//         try {
//             await addDoc(invCol, {
//                 name: newItemName,
//                 quantity: newItemQty,
//                 unit: newItemUnit,
//                 expiry: newItemExpiry,
//                 entryDate: serverTimestamp(),
//                 uid: auth?.currentUser?.uid,
//             })
//         }
//         catch (err) {
//             console.error(err)
//         }
//     }

    

//     return (<div>
//         <input placeholder="Name" onChange={(e) => setNewName(e.target.value)} />
//         <input placeholder="Quantity" type="number" onChange={(e) => setNewQty(Number(e.target.value))} />
        
//         <CreatableSelect isClearable options={unitOptions} onChange={(e) => setNewUnit(e.value)} />
//         <DatePicker selected={newItemExpiry} onChange={(date) => setNewExpiry(date)} />
//         <button onClick={onAddItem}>Add</button>

//     </div>)

// }


