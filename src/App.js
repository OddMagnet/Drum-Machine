import React, { Component } from 'react';
import './App.css';

import { BankOne, BankTwo } from './Components';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      power: true,              // Drum Machine active?
      display: '',              // text that will be displayed
      currentPadBank: BankOne,  // soundbank currently in use
      currentPadBankId: 'Heater Kit', // name of the soundbank
      sliderVolume: 0.3               // current volume
    }
  }

  // function to toggle power
  powerControl = () => {
    this.setState({
      power: !this.state.power, // toggle power
      display: ''               // reset display to empty string
    });
  }

  // function to toggle between the 2 soundbanks
  selectBank = () => {
    // Check for power
    if (this.state.power) {
      // check what is current bank
      if (this.state.currentPadBankId === 'Heater Kit') {
        this.setState({
          currentPadBank: BankTwo,
          display: 'Smooth Piano Kit',
          currentPadBankId: 'Smooth Piano Kit'
        });
      } else {
        this.setState({
          currentPadBank: BankOne,
          display: 'Heater Kit',
          currentPadBankId: 'Heater Kit'
        });
      }
    }
  }

  // function to display the name of the sound played
  displayClipName = (name) => {
    if (this.state.power) {
      this.setState({
        display: name
      });
    }
  }

  // function to change the volume
  adjustVolume = (event) => {
    if (this.state.power) {
      this.setState({
        sliderVolume: event.target.value,                           // set the new volume
        display: 'Volume: ' + Math.round(event.target.value * 100)  // and display it for the user
      });
      setTimeout(() => this.clearDisplay(), 1000);
    }
  }

  // function to clear display
  clearDisplay = () => {
    this.setState({
      display: ''
    });
  }

  render() {
    // variables that hold power- and bank-switch style/positions
    const powerSwitch = this.state.power
      ? {
        float: 'right'
      }
      : {
        float: 'left'
      }
    const bankSwitch = this.state.currentPadBank === BankOne
      ? {
        float: 'left'
      }
      : {
        float: 'right'
      }
    
    // get all elements with class 'clip'
    const clips = [].slice.call(document.getElementsByClassName('clip'));
    // Then set the sound-value for each
    clips.forEach(sound => {
      sound.volume = this.state.sliderVolume
    });
    
    return (
      <h1>Drum Machine</h1>
    );
  }
}

export default App;
