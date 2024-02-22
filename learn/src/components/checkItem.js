import React, { useState } from "react";

export const CheckItem = ({ item, onCheck }) => {

    const [isChecked, setCheck] = useState(true);

    const handleCheck = () => {
        setCheck(!isChecked);
        onCheck(isChecked, item)
    };

    return (
        <>
            <label>
                <input
                    type="checkbox"
                    checked={!isChecked}
                    onChange={handleCheck}
                />
            </label>
        </>
    );
};


