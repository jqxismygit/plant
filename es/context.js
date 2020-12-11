import React from 'react';
import { usePlant } from './';
export var createPlant = function createPlant() {
  return /*#__PURE__*/React.createContext({});
};

var Plant = function Plant(props) {
  var model = props.model,
      plugin = props.plugin,
      options = props.options,
      plant = props.plant,
      children = props.children;
  var core = usePlant(model, options, plugin);
  return /*#__PURE__*/React.createElement(plant.Provider, {
    value: core
  }, children);
};

export var usePlantContext = function usePlantContext(context) {
  return React.useContext(context);
};
export default Plant;