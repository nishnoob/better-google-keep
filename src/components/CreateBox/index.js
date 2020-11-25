import React, { useState, useRef, useEffect } from "react";
import "./index.css";

const CreateBox = () => {
    const [expand, setExpand] = useState(false);
    const wrapperRef = useRef(null);
    const expandRef = useRef(expand);

    const handleClickOutside = (event) => {
        if (
            expandRef.current &&
            wrapperRef.current &&
            !wrapperRef.current.contains(event.target)
        ) {
            setExpand(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div
            className={
                expand
                    ? "create-container create-container-expanded"
                    : "create-container"
            }
            ref={wrapperRef}
        >
            {expand && (
                <input className="note-area" placeholder="Title"></input>
            )}
            <textarea
                onClick={() => {
                    if (!expand) {
                        setExpand(true);
                        expandRef.current = true;
                    }
                }}
                // onBlur={() => setExpand(false)}
                rows={expand ? 2 : 1}
                className="note-area"
                placeholder="Take a note..."
            ></textarea>
            {expand && <div className="close-btn">Close</div>}
        </div>
    );
};

export default CreateBox;
