import React, { Component } from "react";
import ReactDOM from "react-dom";
import YouTube from "react-youtube";
import localforage from 'localforage'
import { Card, CardTitle, Button } from "react-md";

class App extends Component {
  state = {
    buttonPress: 0,
  }

  componentDidMount = () => {
    this.loadLocal()
  }

  loadLocal = async () => {
    const buttonPress = await localforage.getItem('presses') || 0

    console.log(buttonPress, 'data')
    return this.setState({
      buttonPress,
    })
  }

  setLocal = async () => {
    const { buttonPress } = this.state
    return localforage.setItem('presses',  buttonPress + 1 )
  }

  handleAdd = () => {
    const { buttonPress } = this.state
    this.setState({
      buttonPress: buttonPress + 1,
    })
    this.setLocal()
  }

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

    const { buttonPress } = this.state
    console.log('Look who learned to code!!!!!!')
    return (
      <Card>
        <CardTitle
          title="#FRIDAYNIGHTAUCTIONS"
          className="md-grid md-cell md-cell--6"
        />
        <YouTube opts={options} videoId="Wb-Sj3HO5WM" />
        <Button
          name='footButton'
          id='footButton'
          primary
          raised
          onClick={this.handleAdd}
          style={{ color: 'white', background: 'grey', padding: 10, fontSize: 27 }}
          >
          {`You've Pressed the HAIL FOOT LORD button ${buttonPress} times`}
          </Button>
      </Card>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
