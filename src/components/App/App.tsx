import React, {useEffect, useState} from 'react';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import Layout from '../layout/Layout/Layout';
import NoMatch from '../pages/NoMatch/NoMatch';
import ItemsList from '../pages/ItemsList/ItemsList';
import Competition from '../pages/Competition/Competition';
import Team from '../pages/Team/Team';
import Preloader from '../common/Preloader/Preloader';
import Error from '../common/Error/Error';
import {TCompetition, TTeam} from '../../types';
import {loadCompetitionList, loadTeamList} from '../../utils';

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
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Navigate to="competitions"/>}/>
          <Route path="competitions" element={<ItemsList list={competitionList}/>}/>
          <Route path="competitions/:id" element={<Competition/>}/>
          <Route path="teams" element={<ItemsList list={teamList}/>}/>
          <Route path="teams/:id" element={<Team/>}/>
          <Route path="*" element={<NoMatch/>}/>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
