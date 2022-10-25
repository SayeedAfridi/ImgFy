import { useMount } from '@app/lib/hooks';
import React, { createContext, useContext, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mb from '@tensorflow-models/mobilenet';

const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [model, setModel] = useState();

  useMount(async () => {
    try {
      setLoading(true);
      await tf.ready();
      const m = await mb.load();
      setModel(m);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  });

  return (
    <ModelContext.Provider value={{ model, loading }}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModelContext = () => useContext(ModelContext);
