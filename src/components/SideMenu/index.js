import React from "react";
import "./index.css";
import LightBulb from "icons/light-bulb.svg";
import ArchiveIcon from "icons/archive-icon.svg";
import { useDispatch } from "react-redux";
import { TOGGLE_ARCHIVES } from "../../reducer";

const SideMenu = ({ visible, showArchives }) => {
    const dispatch = useDispatch();

    return (
        <div
            className={
                visible
                    ? "side-menu-container"
                    : "side-menu-container side-menu-closed"
            }
        >
            <div
                className={
                    showArchives
                        ? visible
                            ? "side-menu-item"
                            : "side-menu-item side-menu-item-round"
                        : visible
                        ? "side-menu-item-selected"
                        : "side-menu-item-selected side-menu-item-round"
                }
                onClick={() =>
                    dispatch({ type: TOGGLE_ARCHIVES, payload: false })
                }
            >
                <div className="menu-icon-container">
                    <LightBulb fill={showArchives ? "grey" : "white"} />
                </div>
                <div
                    className={
                        visible
                            ? "menu-item-text"
                            : "menu-item-text display-none"
                    }
                >
                    Notes
                </div>
            </div>
            <div
                className={
                    showArchives
                        ? visible
                            ? "side-menu-item-selected"
                            : "side-menu-item-selected side-menu-item-round"
                        : visible
                        ? "side-menu-item"
                        : "side-menu-item side-menu-item-round"
                }
                onClick={() =>
                    dispatch({ type: TOGGLE_ARCHIVES, payload: true })
                }
            >
                <div className="menu-icon-container">
                    <ArchiveIcon fill={showArchives ? "white" : "grey"} />
                </div>
                <div
                    className={
                        visible
                            ? "menu-item-text"
                            : "menu-item-text display-none"
                    }
                >
                    Archive
                </div>
            </div>
        </div>
    );
};

export default SideMenu;
