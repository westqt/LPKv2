/**
 * Application entry point
 */

import './style.scss';

import Header from './components/header';
import EventEmitter from './util/eventEmitter';
import Model from './model';
import ModelView from './components/model';
// import MessageBox from './components/model/messageBox';

let model;
/**
 * Provides app initialization logic
 */
function initApp() {
  Header.init();

  EventEmitter.on('MODEL_LOADED', (data) => {
    model = new Model(data);
    console.log(model);
    ModelView.render(data);
  });
}

/**
 * Initialize application on window load
 */
window.addEventListener('load', initApp);
