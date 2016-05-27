import ReactDOM from 'react-dom';

import routes from './routes';

window.jQuery = window.$ = require('jquery');
require('bootstrap');


ReactDOM.render(routes, document.getElementById('app'));
