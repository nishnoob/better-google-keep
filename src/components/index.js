import React, { useState } from "react";
import "./index.css";
import MenuIcon from "icons/menu.svg";
import SideMenu from "./SideMenu";
import CreateBox from "./CreateBox";

const BetterKeep = () => {
    const [menuOpen, setMenuOpen] = useState(true);

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
                <div className="search"></div>
            </div>
            <div className="body-content">
                <SideMenu visible={menuOpen} />
                <div className="content-top">
                    <CreateBox />
                </div>
            </div>
        </div>
    );
};

export default BetterKeep;
