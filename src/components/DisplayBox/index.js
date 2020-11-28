import React from "react";
import "./index.css";
import PinIcon from "icons/pin-icon.svg";
import ArchiveIcon from "icons/archive-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
    DELETE_NOTE,
    ARCHIVE_NOTE,
    PIN_NOTE,
    UNARCHIVE_NOTE,
    UNPIN_NOTE,
    SELECT_NOTE,
} from "root/reducer";

const DisplayBox = ({
    id,
    title,
    description,
    searchKey,
    isArchived,
    isPinned,
}) => {
    const dispatch = useDispatch();
    const selectedNote = useSelector((state) => state.selectedNote);

    return (
        <div
            className={
                selectedNote.id === id
                    ? "display-box no-display"
                    : "display-box"
            }
            onClick={(e) => {
                dispatch({
                    type: SELECT_NOTE,
                    payload: { id, title, description, isArchived, isPinned },
                });
                e.stopPropagation();
            }}
        >
            <div
                className="delete-icon"
                onClick={(e) => {
                    dispatch({
                        type: DELETE_NOTE,
                        payload: { id },
                    });
                    e.stopPropagation();
                }}
                title="Delete"
            >
                &#10005;
            </div>
            <div
                className="pin-icon"
                onClick={(e) => {
                    dispatch({
                        type: isPinned ? UNPIN_NOTE : PIN_NOTE,
                        payload: { id },
                    });
                    e.stopPropagation();
                }}
                title={isPinned ? "Pin" : "Unpin"}
            >
                <PinIcon />
            </div>
            <div
                className={
                    isArchived ? "archive-icon upside-down" : "archive-icon"
                }
                onClick={(e) => {
                    dispatch({
                        type: isArchived ? UNARCHIVE_NOTE : ARCHIVE_NOTE,
                        payload: { id },
                    });
                    e.stopPropagation();
                }}
                title={isArchived ? "Unarchive" : "Archive"}
            >
                <ArchiveIcon fill="white" />
            </div>
            <div className="display-box-title">{title}</div>
            <div className="display-box-description">{description}</div>
        </div>
    );
};

export default DisplayBox;