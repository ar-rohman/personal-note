import { createContext } from 'react';

const LocalContext = createContext();

export const LocalContextProvider = LocalContext.Provider;

export default LocalContext;
