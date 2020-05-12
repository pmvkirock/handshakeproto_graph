import React from 'react';
import Bodycont from './Container/bodyCont';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
  state = { loginType: '' };

  render() {
    return (
      <BrowserRouter>
        <Bodycont loginType={this.state.loginType} />
      </BrowserRouter>
    );
  }
}

export default App;
