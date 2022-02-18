import {createContext} from 'react';
import {TContextType} from './types';

export const AppContext = createContext<TContextType>({competitionList: [], teamList: []});
