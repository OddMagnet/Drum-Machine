import React, { Component } from 'react';

import DrumPad from './DrumPad';

class PadBank extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    let padBank;
    if (this.props.power) { // if drum machine is on
      // return Drumpad Component with active clips, map the currentPadBank
      // also hand over power state and updateDisplay function
      padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
        return (
          <DrumPad
            clip={padBankArr[i].url}
            clipId={padBankArr[i].id}
            key={i}
            keyCode={padBankArr[i].keyCode}
            keyTrigger={padBankArr[i].keyTrigger}
            power={this.props.power}
            updateDisplay={this.props.updateDisplay}
          />
        );
      });
    } else {
      // same as above, but no active clips without power, so that no sound will play when clicking
      padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
        return (
          <DrumPad
            clip='#'
            clipId={padBankArr[i].id}
            key={i}
            keyCode={padBankArr[i].keyCode}
            keyTrigger={padBankArr[i].keyTrigger}
            power={this.props.power}
            updateDisplay={this.props.updateDisplay}
          />
        );
      });
    }

    return (
      <div className='pad-bank'>{padBank}</div>
    )
  }
}

export default PadBank;