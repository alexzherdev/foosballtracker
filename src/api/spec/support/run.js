import Jasmine from 'jasmine';

let jasmine = new Jasmine();
jasmine.loadConfigFile('src/api/spec/support/jasmine.json');

jasmine.execute();
