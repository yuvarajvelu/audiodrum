import React from 'react';
class AudioDrum extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        props : "",
        songid : "",
        volume: 0.5,
        current : "",
        key : ""
      }
      this.handleVolume = this.handleVolume.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.handleCheckbox = this.handleCheckbox.bind(this);
    }
    componentDidMount() {
      document.addEventListener("keydown",this.handleKeyPress);
    }
    handleCheckbox() {
      let pow = document.getElementById("customSwitch1");
      if(!pow.checked) {
        if(this.state.current!=="") {
          this.state.current.pause();
        }
        if(this.state.key!=="") {
          let b = document.getElementById(this.state.key);
          b.pause();
        }
      }
    }
    
    handleVolume(event) {
      this.setState({
        volume : event.target.value/100
      })
      let x = document.getElementById(this.state.songid)
      x.volume = this.state.volume;
    }
    
    handleClick(event) {
      let pow = document.getElementById("customSwitch1");
      if(pow.checked) {
      if(this.state.key!=="") {
      let b = document.getElementById(this.state.key);
      b.pause();
      }
      let x ;
      if(this.state.current!== "") {
        this.state.current.pause();
      }
        x = document.getElementById(event.target.innerText);
        this.setState({
          props : event.target.id,
          current : x,
          songid : event.target.innerText
        })
        x.currentTime = 0;
        x.play();
      }  
    }
    handleKeyPress(event) {
      let pow = document.getElementById("customSwitch1");
      if(pow.checked) {
      let regex = /[A-Z]/i;
      if(regex.test(event.key)) {
        if(this.state.current!=="") {
          this.state.current.pause();
        }
      let a ="";
      if(this.state.key!=="") {
        let b = document.getElementById(this.state.key);
        b.pause();
      }
  
      this.setState ({
        key : event.key.toUpperCase(),
      })
  
      a = document.getElementById(this.state.key);
      let parent = a.parentNode;
      this.setState({
        songid : parent.innerText,
        props : parent.id
      })
      a.currentTime = 0;
      a.play();
      } 
    }
    }
    
    render() {
      
      return (
        <div id="drum-machine" className="audio-drum">
          <section class="drum-controls">
            <section className="power-control text-center">
              <label className="power "><strong>Power</strong></label>
              <div class="custom-control custom-switch text-center">
                <input type="checkbox" class="custom-control-input" id="customSwitch1" onClick={this.handleCheckbox} checked/>
                <label class="custom-control-label" for="customSwitch1"></label>
              </div>
            </section>
            <section id="display" className="name">
              {this.state.props}
            </section>
            <div id="volume-control">
              <label class="volume"><strong>Volume: {Math.round(this.state.volume*100)}</strong></label><br />
              <input type="range" id="volume" class="slider" name="volume" min="0" max="100" step="1" onChange={this.handleVolume}  />
            </div>
          </section>
          <section className="drum-key">
            <p className="basics">Click Buttons or Type the Button Text</p>
            <div className="drumkey1">
              <button className="drum-pad" id="Heated 1" onClick={this.handleClick}><audio id="Q" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"></audio>Q</button>
              <button className="drum-pad" id="Heated 2" onClick={this.handleClick}><audio id="W" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"></audio>W</button>
              <button className="drum-pad" id="Heated 3" onClick={this.handleClick}><audio id="E" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"></audio>E</button>
            </div>
            <div className="drumkey2">
              <button className="drum-pad" id="Heated 4" onClick={this.handleClick}><audio id="A" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"></audio>A</button>
              <button className="drum-pad" id="Clap" onClick={this.handleClick}><audio id="S" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"></audio>S</button>
              <button className="drum-pad" id="Open HH" onClick={this.handleClick}><audio id="D" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"></audio>D</button>
            </div>
            <div className="drumkey3">
              <button className="drum-pad" id="Kick n' hat" onClick={this.handleClick}><audio id="Z" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"></audio>Z</button>
              <button className="drum-pad" id="Kick" onClick={this.handleClick}><audio id="X" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"></audio>X</button>
              <button className="drum-pad" id="Closed HH" onClick={this.handleClick}><audio id="C" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"></audio>C</button>
            </div>
          </section>
        </div>
      )
    }
  }
export default AudioDrum;
