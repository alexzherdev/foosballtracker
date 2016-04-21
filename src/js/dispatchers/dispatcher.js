import { Dispatcher } from 'flux';


let KSDispatcher = new Dispatcher();

KSDispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action
  });
};

export default KSDispatcher;