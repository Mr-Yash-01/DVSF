import React, { forwardRef } from "react";

/**
 * Inputbox component renders a labeled input field with customizable properties.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title to be displayed above the input field.
 * @param {string} props.hint - The placeholder text for the input field.
 * @param {function} props.onchange - The function to call when the input value changes.
 * @param {string} props.inputId - The id attribute for the input element.
 * @param {function} props.onKeyDown - The function to call when a key is pressed down in the input field.
 * @param {string} [props.type="text"] - The type attribute for the input element.
 * @param {React.Ref} ref - The ref to be attached to the input element.
 *
 * @returns {JSX.Element} The rendered Inputbox component.
 */
const Inputbox = forwardRef(({ title, hint, onchange, inputId, onKeyDown, type = "text" }, ref) => {
    return (
        <div className="text-left text-slate-800">
            <h1 className="mt-2 ml-2">
                {title}
            </h1>
            <input
                id={inputId}
                ref={ref}
                onChange={onchange}
                onKeyDown={onKeyDown}
                className="border-2 w-full rounded-lg px-[12px] py-[3px] focus:outline-gray-500"
                type={type}
                placeholder={hint}
            />
        </div>
    );
});

export default Inputbox;
