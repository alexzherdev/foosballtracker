import React from 'react';

import Nav from '../components/nav';


const App = ({children}) =>
  <div>
    <Nav />
    <div className="content">
      {children}
    </div>
  </div>;

export default App;
