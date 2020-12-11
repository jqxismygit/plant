import { usePlantCore } from './core';
import flat from './plugins/flat';
import tree from './plugins/tree';
import { Plugin, PlantModel, PlantCore, Option } from './types';

const presetPlugin = {
  flat: flat,
  tree: tree,
};

export const usePlant = <T = any>(
  model: PlantModel,
  options: Option = {},
  plugin?: Plugin,
): PlantCore<T> => {
  const { type = 'flat' } = options;
  const applyPlugin =
    typeof plugin !== 'undefined' ? plugin : presetPlugin[type];
  if (!applyPlugin) {
    throw new Error('plant plugin error');
  }
  return usePlantCore(model, options, applyPlugin);
};

export { default as Plant, createPlant, usePlantContext } from './context';
