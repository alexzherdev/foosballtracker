import React from 'react';
import { node } from 'prop-types';

import Nav from './components/nav';


const App = ({children}) =>
  <div>
    <Nav />
    <div className="content">
      {children}
    </div>
  </div>;

App.propTypes = {
  children: node.isRequired
};

export default App;
