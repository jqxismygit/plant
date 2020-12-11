import React from 'react';
import { PlantContextProps, PlantCore } from './types';
import { usePlant } from './';

export const createPlant = () =>
  React.createContext<PlantCore>({} as PlantCore);

const Plant: React.FC<PlantContextProps> = (props) => {
  const { model, plugin, options, plant, children } = props;

  const core = usePlant(model, options, plugin);

  return <plant.Provider value={core}>{children}</plant.Provider>;
};

export const usePlantContext = (context: React.Context<PlantCore>): PlantCore =>
  React.useContext<PlantCore>(context);

export default Plant;
