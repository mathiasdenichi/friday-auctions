import React, { Component } from "react";
import ReactDOM from "react-dom";
import YouTube from "react-youtube";
import { Card, CardTitle } from "react-md";

import "./styles.css";

class App extends Component {
  render() {
    const options = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        start: 1098,
        loop: 1
      }
    };
    return (
      <Card>
        <CardTitle
          title="#FRIDAYNIGHTAUCTIONS"
          className="md-grid md-cell md-cell--6"
        />
        <YouTube opts={options} videoId="Wb-Sj3HO5WM" />
      </Card>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
