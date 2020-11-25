import React, { useState } from "react";
import "./index.css";
import LightBulb from "icons/light-bulb.svg";
import ArchiveIcon from "icons/archive-icon.svg";

const SideMenu = ({ visible, showArchives, toggleArchives }) => {
    const [peek, setPeek] = useState(false);
    return (
        <div
            className={
                visible || peek
                    ? "side-menu-container"
                    : "side-menu-container side-menu-closed"
            }
            onMouseOver={() => {
                if (!visible) {
                    setPeek(true);
                }
            }}
            onMouseOut={() => {
                // if (visible) {
                setPeek(false);
                // }
            }}
        >
            <div
                className={
                    showArchives
                        ? visible || peek
                            ? "side-menu-item"
                            : "side-menu-item side-menu-item-round"
                        : visible || peek
                        ? "side-menu-item-selected"
                        : "side-menu-item-selected side-menu-item-round"
                }
                onClick={() => toggleArchives(false)}
            >
                <div className="menu-icon-container">
                    <LightBulb fill={showArchives ? "grey" : "white"} />
                </div>
                <div
                    className={
                        visible || peek
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
                        ? visible || peek
                            ? "side-menu-item-selected"
                            : "side-menu-item-selected side-menu-item-round"
                        : visible || peek
                        ? "side-menu-item"
                        : "side-menu-item side-menu-item-round"
                }
                onClick={() => toggleArchives(true)}
            >
                <div className="menu-icon-container">
                    <ArchiveIcon fill={showArchives ? "white" : "grey"} />
                </div>
                <div
                    className={
                        visible || peek
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
