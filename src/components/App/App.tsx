import React, {useEffect, useState} from 'react';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import Layout from '../layout/Layout/Layout';
import ItemsList from '../pages/ItemsList/ItemsList';
import Calendar from '../pages/Calendar/Calendar';
import Preloader from '../common/Preloader/Preloader';
import Error from '../common/Error/Error';
import {TCompetition, TTeam} from '../../types';
import {loadCompetitionList, loadTeamList} from '../../utils';
import {AppContext} from '../../context';

const App: React.FC = () => {
  const [preloader, setPreloader] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [competitionList, setCompetitionList] = useState<Array<TCompetition>>([]);
  const [teamList, setTeamList] = useState<Array<TTeam>>([]);

  useEffect(() => {
    Promise.all([loadCompetitionList(), loadTeamList()])
        .then(([competitionList, teamList]) => {
          setCompetitionList(competitionList);
          setTeamList(teamList);
        })
        .catch((err: Error) => setError(err.message))
        .finally(() => setPreloader(false));
  }, []);

  if (preloader) return <Preloader/>;

  if (error) return <Error error={error}/>;

  return (
    <AppContext.Provider value={{competitionList, teamList}}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Navigate to="competitions"/>}/>
            <Route path="competitions" element={<ItemsList listType="competition"/>}/>
            <Route path="teams" element={<ItemsList listType="team"/>}/>
            <Route path="competitions/:id" element={<Calendar calendarType="competition"/>}/>
            <Route path="teams/:id" element={<Calendar calendarType="team"/>}/>
            <Route path="*" element={<Error error="Старница не найдена..."/>}/>
          </Route>
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
