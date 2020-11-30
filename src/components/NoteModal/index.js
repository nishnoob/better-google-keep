import React, { useEffect, useState } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import {
    EDIT_NOTE,
    PIN_NOTE,
    UNPIN_NOTE,
    UNSELECT_NOTE,
    ARCHIVE_NOTE,
    UNARCHIVE_NOTE,
} from "root/reducer";
import PinIcon from "icons/pin-icon.svg";
import ArchiveIcon from "icons/archive-icon.svg";

const NoteModal = ({ selectedNote }) => {
    const [noteDetails, setNoteDetails] = useState({
        ...selectedNote,
    });

    useEffect(() => {
        setNoteDetails({ ...selectedNote });
    }, [selectedNote]);
    const dispatch = useDispatch();

    if (
        !selectedNote ||
        Object.keys(selectedNote).length === 0 ||
        !selectedNote.id
    )
        return null;

    const closeNote = () => {
        if (JSON.stringify(noteDetails) !== JSON.stringify(selectedNote)) {
            dispatch({ type: EDIT_NOTE, payload: { ...noteDetails } });
        }
        dispatch({ type: UNSELECT_NOTE });
    };

    return (
        <div
            className="modal-backdrop"
            onClick={(e) => {
                closeNote();
                e.stopPropagation();
            }}
        >
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="modal-pin-icon-container"
                    onClick={(e) => {
                        dispatch({
                            type: selectedNote.isPinned ? UNPIN_NOTE : PIN_NOTE,
                            payload: { id: noteDetails.id },
                        });
                        e.stopPropagation();
                    }}
                    title={selectedNote.isPinned ? "Unpin" : "Pin"}
                >
                    <PinIcon className="modal-pin-icon" />
                </div>
                <div
                    className={
                        selectedNote.isArchived
                            ? "modal-archive-icon-container upside-down"
                            : "modal-archive-icon-container"
                    }
                    onClick={(e) => {
                        dispatch({
                            type: selectedNote.isArchived
                                ? UNARCHIVE_NOTE
                                : ARCHIVE_NOTE,
                            payload: { id: noteDetails.id },
                        });
                        e.stopPropagation();
                    }}
                    title={selectedNote.isArchived ? "Unarchive" : "Archive"}
                >
                    <ArchiveIcon className="modal-archive-icon" />
                </div>
                <div className="close-btn" onClick={closeNote}>
                    Close
                </div>
                <input
                    className="modal-title"
                    value={noteDetails.title || ""}
                    onChange={(e) => {
                        setNoteDetails({
                            ...noteDetails,
                            title: e.target.value,
                        });
                    }}
                    placeholder="Title"
                ></input>
                <textarea
                    className="modal-description"
                    value={noteDetails.description}
                    onChange={(e) => {
                        setNoteDetails({
                            ...noteDetails,
                            description: e.target.value,
                        });
                    }}
                    placeholder="Take a note?"
                ></textarea>
            </div>
        </div>
    );
};

export default NoteModal;
