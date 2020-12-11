import { usePlantCore } from './core';
import flat from './plugins/flat';
import tree from './plugins/tree';
const presetPlugin = {
  flat: flat,
  tree: tree
};
export const usePlant = (model, options = {}, plugin) => {
  const _options$type = options.type,
        type = _options$type === void 0 ? 'flat' : _options$type;
  const applyPlugin = typeof plugin !== 'undefined' ? plugin : presetPlugin[type];

  if (!applyPlugin) {
    throw new Error('plant plugin error');
  }

  return usePlantCore(model, options, applyPlugin);
};
export { default as Plant, createPlant, usePlantContext } from './context';