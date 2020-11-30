import React from "react";
import BetterKeep from "./components";
import "./App.css";
import { connect } from "react-redux";

const themes = {
    dark: {
        "--color-background": "rgba(32, 33, 36, 1)",
        "--color-secondary-background": "rgb(241, 243, 244, 0.24)",
        "--color-inactive": "#9aa0a6",
        "--color-hover-highlight": "rgb(56, 56, 56)",
        "--color-secondary-hover-highlight": "rgb(236, 236, 236)",
        "--color-selected-yellow": "#41331c",
        "--color-border": "rgba(141, 141, 141, 0.671)",
        "--color-primary-text": "white",
        "--color-secondary-text": "black",
        "--color-primary-shadow": "0px 2px 10px -1px rgba(0, 0, 0, 0.75)",
    },
    light: {
        "--color-background": "#e0e0e0",
        "--color-secondary-background": "#7b7b7b3d",
        "--color-inactive": "#9aa0a6",
        "--color-hover-highlight": "#cbcbcb",
        "--color-secondary-hover-highlight": "#cbcbcb8f",
        "--color-selected-yellow": "#dcab5b",
        "--color-border": "rgba(141, 141, 141, 0.671)",
        "--color-primary-text": "#5a5a5a",
        "--color-secondary-text": "#282828",
        "--color-primary-shadow": "0px 2px 5px -1px rgba(0, 0, 0, 0.2)",
    },
};

class App extends React.Component {
    constructor(props) {
        super(props);

        const theme = themes.light;

        Object.keys(theme).forEach((key) => {
            const value = theme[key];
            document.documentElement.style.setProperty(key, value);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { isDarkMode } = this.props;
        if (prevProps.isDarkMode !== isDarkMode) {
            const theme = isDarkMode ? themes.dark : themes.light;

            Object.keys(theme).forEach((key) => {
                const value = theme[key];
                document.documentElement.style.setProperty(key, value);
            });
        }
    }

    render() {
        return (
            <div className="App">
                <BetterKeep />
            </div>
        );
    }
}

export default connect((state) => ({ isDarkMode: state.isDarkMode }))(App);
