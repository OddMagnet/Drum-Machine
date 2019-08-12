import React, { Component } from 'react';

// Helper Styles
// Active when clicked / key pressed
// more top-margin and no y value for boxShadow => pressed down effect
const activeStyle = {
    backgroundColor: 'lightskyblue',
    boxShadow: '0 3px lightskyblue',
    height: 77,
    marginTop: 13
};
// else inactive
const inactiveStyle = {
    backgroundColor: 'grey',
    marginTop: 10,
    boxShadow: '3px 3px 5px black'
};
class DrumPad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            padStyle: inactiveStyle
        }
    }

    // add event listeners on mount
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeypress);
    }
    // remove them when unmounting
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeypress);
    }

    // handle keypresses, play sound when corrosponding key is pressed
    handleKeypress = (event) => {
        if (event.keyCode === this.props.keyCode) {
            this.playSound();
        }
    }

    // activate pads when they're pressed (style them correctly)
    // The if checks are because of the last setState. Setting the button to active (pressed down)
    // while power is off means I don't want a background color, but that also means that I can't
    // just check if the current style is exactly the same as the predefined ones
    activatePad = () => {
        // check if dum machine is on
        if (this.props.power) {
            // check if it's already active
            if (this.state.padStyle.backgroundColor === 'lightskyblue') {
                // then set to inactive
                this.setState({
                    padStyle: inactiveStyle
                });
            } else {
                // set to active
                this.setState({
                    padStyle: activeStyle
                });
            }
        } else if (this.state.padStyle.marginTop === 13) {
            this.setState({
                // if power is off and button is pressed, set it to inactive
                padStyle: inactiveStyle
            });
        } else {
            this.setState({
                // power off and button not pressed, set it to active without the BG Color
                padStyle: {
                    height: 77,
                    marginTop: 13,
                    backgroundColor: 'grey',
                    boxShadow: '0 3px grey'
                }
            });
        }
    }

    // get sound, play it, activate pad and deactive after a few ms. Also show soud being played
    playSound = () => {
        const sound = document.getElementById(this.props.keyTrigger);
        sound.currentTime = 0;
        sound.play();
        this.activatePad();
        setTimeout(() => this.activatePad(), 100);
        this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
    }

    render() {
        return (
            <div
                className='drum-pad'
                id={this.props.clipId}
                onClick={this.playSound}
                style={this.state.padStyle}
            >
                {/* audio container */}
                <audio
                    className='clip'
                    id={this.props.keyTrigger}
                    src={this.props.clip}
                />
                {/* text of Dumpad => key/letter */}
                {this.props.keyTrigger}
            </div>
        );
    }

}

export default DrumPad;