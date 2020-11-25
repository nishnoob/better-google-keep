import React, { useState } from "react";
import "./index.css";
import MenuIcon from "icons/menu.svg";
import SearchIcon from "icons/search-icon.svg";
import SideMenu from "./SideMenu";
import CreateBox from "./CreateBox";
import { useSelector } from "react-redux";
import DisplayBox from "./DisplayBox";

const BetterKeep = () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchKey, setSearchKey] = useState("");
    const [showArchives, toggleArchives] = useState(false);
    const notesList = useSelector((state) => state.notes);

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
            <div className="header">
                <div className="header-left">
                    <div
                        className="hamburger"
                        onClick={() => {
                            setMenuOpen(!menuOpen);
                        }}
                    >
                        <MenuIcon width={18} height={18} fill="white" />
                    </div>
                    Better Keep
                </div>
                <div
                    className={
                        searchOpen
                            ? "search-container search-container-open"
                            : "search-container"
                    }
                >
                    <div className="search-icon-container">
                        <SearchIcon
                            width={18}
                            height={18}
                            fill={searchOpen ? "black" : "white"}
                        />
                    </div>
                    <input
                        className="search-input"
                        placeholder="Search"
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        onFocus={() => setSearchOpen(true)}
                        onBlur={() => {
                            setSearchOpen(false);
                            setSearchKey("");
                        }}
                    ></input>
                    {searchOpen && searchKey.length > 0 && (
                        <div
                            className="search-clear-container"
                            onClick={() => setSearchKey("")}
                        >
                            &#10005;
                        </div>
                    )}
                </div>
            </div>
            <div className="bottom">
                <SideMenu
                    visible={menuOpen}
                    showArchives={showArchives}
                    toggleArchives={(val) => toggleArchives(val)}
                />
                <div className="body-content">
                    <div className="content-top">
                        <CreateBox />
                    </div>
                    {!showArchives && pinnedNotes.length > 0 && (
                        <>
                            <span>PINNED</span>
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
                        {pinnedNotes.length > 0 && <span>OTHERS</span>}
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
            </div>
        </div>
    );
};

export default BetterKeep;
