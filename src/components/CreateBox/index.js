import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import { CREATE_NOTE } from "root/reducer";
import { useDispatch } from "react-redux";

const createID = () => Math.random().toString(36).substr(2, 9);

const CreateBox = () => {
    const [expand, setExpand] = useState(false);
    const wrapperRef = useRef(null);
    const expandRef = useRef(expand);
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const noteDataRef = useRef({ description, title });

    const createNote = () => {
        setExpand(false);
        expandRef.current = false;
        if (noteDataRef.current.description || noteDataRef.current.title) {
            dispatch({
                type: CREATE_NOTE,
                payload: {
                    id: createID(),
                    description: noteDataRef.current.description,
                    title: noteDataRef.current.title,
                },
            });
            setDescription("");
            setTitle("");
        }
    };

    const handleClickOutside = (event) => {
        if (
            expandRef.current &&
            wrapperRef.current &&
            !wrapperRef.current.contains(event.target)
        ) {
            createNote();
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
                <input
                    className="note-area"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        noteDataRef.current.title = e.target.value;
                    }}
                ></input>
            )}
            <textarea
                onClick={() => {
                    if (!expand) {
                        setExpand(true);
                        expandRef.current = true;
                    }
                }}
                // onBlur={() => setExpand(false)}
                rows={expand ? 3 : 1}
                className="note-area"
                placeholder="Take a note..."
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value);
                    noteDataRef.current.description = e.target.value;
                }}
            ></textarea>
            {expand && (
                <div className="close-btn" onClick={createNote}>
                    Close
                </div>
            )}
        </div>
    );
};

export default CreateBox;
