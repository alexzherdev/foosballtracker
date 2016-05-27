import React from 'react';

import Nav from '../components/nav';


const App = ({children}) =>
  <div>
    <Nav />
    <div className="content">
      {children}
    </div>
  </div>;

App.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default App;
