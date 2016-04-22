import { Dispatcher } from 'flux';


let KSDispatcher = new Dispatcher();

KSDispatcher.handleViewAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action
  });
};

KSDispatcher.handleServerAction = function(action) {
  this.dispatch({
    source: 'SERVER_ACTION',
    action
  });
};

export default KSDispatcher;