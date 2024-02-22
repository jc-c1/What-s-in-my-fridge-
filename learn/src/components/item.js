import React, { useState } from "react";

import { DeleteItem } from "./deleteItem"
import { UpdateItem } from "./updateItem";
import { CheckItem } from "./checkItem";

export const Items = ({ item, handleCheck }) => {
    const [update, setUpdate] = useState(false);
 
    const daysUntilExpiry = (item.expiry.toDate() - new Date()) / (1000 * 60 * 60 * 24);
    const textColor = daysUntilExpiry < 5 ? "red" : "blue";


    const handleUpdateStatus = (status) => {
        setUpdate(status); // Toggle the update state based on the previous state
    };




    return (
        <div key={item.id} >

            <CheckItem item={item} onCheck={handleCheck}/>

            <span style={{ color: textColor }}>{item.name}</span> -
            Quantity: {item.quantity} {item.unit} {" "}
            Expiry: {item.expiry.toDate().toDateString()}{" "}

            <DeleteItem id={item.id} /> {" "}

            {!update ?
                (<button onClick={() => setUpdate(!update)}>
                    {!update ? "Update" : null} </button>)
                :
                (<div><UpdateItem id={item.id} onUpdate={handleUpdateStatus} /></div>)}
        </div>
    );
};

export default Items;
