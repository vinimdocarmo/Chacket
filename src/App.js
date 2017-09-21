import React, { Component } from 'react';
import RoomsList from './chat/components/RoomsList';
import Room from './chat/components/Room';

class App extends Component {
  render() {
    return (
      <div>
        <header><h1>Chacket</h1></header>

        <div className="container">
          <h2>Sign in</h2>
          <form>
              <fieldset>
                <label htmlFor="username">username</label>
                <input type="text" placeholder="Example: vinimdocarmo" id="username"/>
                <input className="button-primary" type="submit" value="Sign In" />
              </fieldset>
            </form>
        </div>

        <div className="container">
          <div className="row">
            <div className="column">
              <RoomsList rooms={['general']} type="channel"/>
              <hr />
              <RoomsList rooms={['vinimdocarmo', 'danieltdocarmo', 'nicamorim']} type="direct"/>
            </div>
            <div className="column column-80">
              <Room />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
