import React from "react";
import "./index.css";
import LightBulb from "icons/light-bulb.svg";
import ArchiveIcon from "icons/archive-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_ARCHIVES, TOGGLE_DARK_MODE } from "root/reducer";

const SideMenu = ({ visible, showArchives }) => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.isDarkMode);

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
            <div className="switch-container">
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={() => dispatch({ type: TOGGLE_DARK_MODE })}
                    ></input>
                    <span class="slider round"></span>
                </label>
                <div className="switch-header">DARK MODE</div>
            </div>
        </div>
    );
};

export default SideMenu;
