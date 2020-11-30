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
import marked from "marked";
import DOMPurify from "dompurify";

const DisplayBox = ({ id, title, description, isArchived, isPinned }) => {
    const dispatch = useDispatch();
    const selectedNote = useSelector((state) => state.selectedNote);
    const rawMarkupDescription = DOMPurify.sanitize(marked(description));
    return (
        <div
            className={
                selectedNote === id ? "display-box no-display" : "display-box"
            }
            onClick={(e) => {
                dispatch({
                    type: SELECT_NOTE,
                    payload: id,
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
                className="pin-icon-container"
                onClick={(e) => {
                    dispatch({
                        type: isPinned ? UNPIN_NOTE : PIN_NOTE,
                        payload: { id },
                    });
                    e.stopPropagation();
                }}
                title={isPinned ? "Pin" : "Unpin"}
            >
                <PinIcon className="pin-icon" />
            </div>
            <div
                className={
                    isArchived
                        ? "archive-icon-container upside-down"
                        : "archive-icon-container"
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
                <ArchiveIcon className="archive-icon" />
            </div>
            <div className="display-box-title">{title}</div>
            <div
                className="display-box-description"
                dangerouslySetInnerHTML={{ __html: rawMarkupDescription }}
            ></div>
        </div>
    );
};

export default DisplayBox;
