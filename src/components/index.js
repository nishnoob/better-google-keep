import React, { useState } from "react";
import "./index.css";
import { useSelector } from "react-redux";

import Header from "./Header";
import SideMenu from "./SideMenu";
import CreateBox from "./CreateBox";
import DisplayBox from "./DisplayBox";
import NoteModal from "./NoteModal";

const BetterKeep = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchKey, setSearchKey] = useState("");
    const notesList = useSelector((state) => state.notes);
    const showArchives = useSelector((state) => state.showArchives);
    const isMenuOpen = useSelector((state) => state.isMenuOpen);
    const selectedNote = useSelector((state) => state.selectedNote);
    const selectedNoteData = notesList.filter(
        (item) => item.id === selectedNote.id
    );

    const pinnedNotes = [];
    const notesToShow = notesList.filter((noteItem) => {
        if (searchKey.length) {
            if (noteItem.description) {
                return noteItem.description.toLowerCase().includes(searchKey);
            } else if (noteItem.title) {
                return noteItem.title.toLowerCase().includes(searchKey);
            } else {
                return true;
            }
        }

        if (showArchives && noteItem.isArchived) {
            return true;
        } else if (!showArchives && !noteItem.isArchived) {
            if (noteItem.isPinned) {
                pinnedNotes.push(noteItem);
                return false;
            }
            return true;
        }
    });

    return (
        <div className="container">
            <Header
                searchKey={searchKey}
                setSearchKey={setSearchKey}
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
            />
            <div className="bottom">
                <SideMenu visible={isMenuOpen} showArchives={showArchives} />
                <div
                    className={
                        isMenuOpen
                            ? "body-content"
                            : "body-content body-content-big"
                    }
                >
                    <div className="content-top">
                        <CreateBox />
                    </div>
                    {notesList.length > 0 ? (
                        <div>
                            {!showArchives && pinnedNotes.length > 0 && (
                                <>
                                    <div className="body-section-header">
                                        PINNED
                                    </div>
                                    <div className="notes-container">
                                        {pinnedNotes.map((noteItem, index) => (
                                            <DisplayBox
                                                key={noteItem.id}
                                                searchKey={searchKey}
                                                {...noteItem}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                            <>
                                {pinnedNotes.length > 0 && (
                                    <div className="body-section-header">
                                        OTHERS
                                    </div>
                                )}
                                <div className="notes-container">
                                    {notesToShow.map((noteItem, index) => (
                                        <DisplayBox
                                            key={noteItem.id}
                                            searchKey={searchKey}
                                            {...noteItem}
                                        />
                                    ))}
                                </div>
                            </>
                        </div>
                    ) : (
                        <p className="empty-text">
                            Better Keep a note of it...
                        </p>
                    )}
                </div>
                {selectedNote.id && (
                    <NoteModal selectedNote={selectedNoteData[0]} />
                )}
            </div>
        </div>
    );
};

export default BetterKeep;
