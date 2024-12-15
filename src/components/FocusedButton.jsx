import React from "react";

/**
 * FocusedButton component renders a styled button with given properties.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.payload - The text or content to be displayed inside the button.
 * @param {function} props.onclick - The function to be called when the button is clicked.
 * @param {string} props.id - The unique identifier for the button element.
 * @param {boolean} props.disabled - The boolean flag to disable the button.
 * @returns {JSX.Element} The rendered button component.
 */
export default function FocusedButton({ payload, onclick, id, disabled }) {
    return <button disabled={disabled} id={id} onClick={onclick} className="bg-white mt-4 w-full border-2 !text-slate-800 border-slate-700 font-bold py-2 px-4 rounded">
        {payload}
    </button>

}