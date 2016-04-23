import { Dispatcher } from 'flux';


let FTDispatcher = new Dispatcher();

FTDispatcher.handleViewAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action
  });
};

FTDispatcher.handleServerAction = function(action) {
  this.dispatch({
    source: 'SERVER_ACTION',
    action
  });
};

export default FTDispatcher;
