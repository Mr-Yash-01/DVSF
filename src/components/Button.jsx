    import React from "react";

    /**
     * Button component renders a styled button element.
     *
     * @param {Object} props - The properties object.
     * @param {string} props.payload - The text or content to be displayed inside the button.
     * @param {function} props.onclick - The function to be called when the button is clicked.
     * @param {string} [props.id] - The optional id attribute for the button element.
     * @param {boolean} [props.disabled] - The optional disabled state of the button.
     * @returns {JSX.Element} The rendered button element.
     */
    export default function Button({payload,onclick, id, disabled}) {
        return <button disabled={disabled} id={id} onClick={onclick} className="bg-slate-800 mt-4 w-full hover:bg-slate-500 text-white font-bold py-2 px-4 rounded">
            {payload}
        </button>
    }