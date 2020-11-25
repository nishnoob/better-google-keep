import React from "react";
import "./index.css";
import PinIcon from "icons/pin-icon.svg";
import ArchiveIcon from "icons/archive-icon.svg";
import { useDispatch } from "react-redux";
import {
    ARCHIVE_NOTE,
    PIN_NOTE,
    UNARCHIVE_NOTE,
    UNPIN_NOTE,
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

    return (
        <div className="display-box">
            <div
                className="pin-icon"
                onClick={() =>
                    dispatch({
                        type: isPinned ? UNPIN_NOTE : PIN_NOTE,
                        payload: { id },
                    })
                }
                title={isPinned ? "Pin" : "Unpin"}
            >
                <PinIcon />
            </div>
            <div
                className={
                    isArchived ? "archive-icon upside-down" : "archive-icon"
                }
                onClick={() =>
                    dispatch({
                        type: isArchived ? UNARCHIVE_NOTE : ARCHIVE_NOTE,
                        payload: { id },
                    })
                }
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
