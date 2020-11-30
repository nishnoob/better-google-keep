import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import { CREATE_NOTE } from "root/reducer";
import { useDispatch } from "react-redux";
import PinIcon from "icons/pin-icon.svg";
import ArchiveIcon from "icons/archive-icon.svg";

const createID = () => Math.random().toString(36).substr(2, 9);

const CreateBox = () => {
    const [expand, setExpand] = useState(false);
    const wrapperRef = useRef(null);
    const expandRef = useRef(expand);
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPinned, setPinned] = useState(false);
    const [isArchived, setArchived] = useState(false);
    const noteDataRef = useRef({ description, title, isPinned, isArchived });

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
                    isPinned: noteDataRef.current.isPinned,
                    isArchived: noteDataRef.current.isArchived,
                },
            });
            setDescription("");
            setTitle("");
            setPinned(false);
            setArchived(false);
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
                <div className="buttons-container">
                    <div
                        className={
                            isPinned
                                ? "create-pin-icon-container pinned"
                                : "create-pin-icon-container"
                        }
                        onClick={() => {
                            noteDataRef.current.isPinned = !isPinned;
                            setPinned(!isPinned);
                        }}
                        title={isPinned ? "Unpin" : "Pin"}
                    >
                        <PinIcon className="create-pin-icon" />
                    </div>
                    <div
                        className={
                            isArchived
                                ? "create-archive-icon-container upside-down"
                                : "create-archive-icon-container"
                        }
                        onClick={() => {
                            noteDataRef.current.isArchived = !isArchived;
                            setArchived(!isArchived);
                        }}
                        title={isArchived ? "Unarchive" : "Archive"}
                    >
                        <ArchiveIcon className="create-archive-icon" />
                    </div>
                    <div className="close-btn" onClick={createNote}>
                        Close
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateBox;
