import React from "react";
import MenuIcon from "icons/menu.svg";
import SearchIcon from "icons/search-icon.svg";
import { TOGGLE_MENU } from "root/reducer";
import "./styles.css";
import { useDispatch } from "react-redux";

const Header = ({
    searchKey,
    searchOpen,
    setSearchKey,
    setSearchOpen,
    showArchives,
}) => {
    const dispatch = useDispatch();

    return (
        <div className="header">
            <div className="header-left">
                <div
                    className="hamburger"
                    onClick={() => {
                        dispatch({ type: TOGGLE_MENU });
                    }}
                >
                    <MenuIcon width={18} height={18} className="menu-icon" />
                </div>
                <span className="logo">
                    {showArchives ? "Archives" : "Better Keep"}
                </span>
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
                        className={
                            searchOpen
                                ? "search-icon"
                                : "search-icon search-icon-inverted"
                        }
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
    );
};

export default Header;
