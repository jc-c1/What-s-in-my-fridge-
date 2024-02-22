
import { db, auth } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import CreatableSelect from 'react-select/creatable';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../datepicker.css"

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


    const topInputs = {
        marginTop: "3em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };


    const colourStyles = {

        control: styles => ({ ...styles, width: "175px" }),



    };
    const inputBox = {
        height: "30px", fontSize: "15px"
    }


    return (
        <div style={topInputs}>
            <div style={{marginBottom:"10px"}}><span><b>New Item</b></span></div>
            <div style={{ paddingBottom: "10px" }}>
                <span style={{ padding: "10px", paddingRight: "35px" }}>Food:</span>
                <span ><input style={inputBox} onChange={(e) => setNewName(e.target.value)} /></span>
            </div>

            <div style={{ paddingBottom: "10px" }}>
                <span style={{ padding: "10px", paddingRight: "10px" }}>Quantity:</span>
                <span ><input style={inputBox} type="number" onChange={(e) => setNewQty(Number(e.target.value))} /></span>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "10px" }}>
                <span style={{ padding: "10px", paddingRight: "41px" }}>Unit:</span>
                <CreatableSelect styles={colourStyles} isClearable options={unitOptions} onChange={(e) => setNewUnit(e.value)} />

            </div>
            <div style={{ paddingBottom: "10px" }}>
                <span style={{ padding: "10px", paddingRight: "28px" }}>Expiry:</span>
                <DatePicker className="dp" selected={newItemExpiry} onChange={(date) => setNewExpiry(date)} />

            </div>

            <div style={{paddingBottom: "10px" }}>
                <button style={{ margin: "10px" }} onClick={onAddItem}>Submit</button>
            </div>
        </div>
    );
};


