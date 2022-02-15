import React, {useEffect, useState} from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import Layout from '../layout/Layout/Layout';
import NoMatch from '../pages/NoMatch/NoMatch';
import Main from '../pages/Main/Main';
import CompetitionList from '../pages/CompetitionList/CompetitionList';
import Competition from '../pages/Competition/Competition';
import TeamList from '../pages/TeamList/TeamList';
import Team from '../pages/Team/Team';
import Preloader from '../common/Preloader/Preloader';
import {loadCompetitionList, loadTeamList} from '../../utils';
import Error from '../common/Error/Error';
import {TCompetition, TTeam} from '../../types';

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

  console.log(error);
  if (error) return <Error error={error}/>;

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path="competition_list" element={<CompetitionList list={competitionList}/>}/>
          <Route path="competition/:id" element={<Competition/>}/>
          <Route path="team_list" element={<TeamList list={teamList}/>}/>
          <Route path="team/:id" element={<Team/>}/>
          <Route path="*" element={<NoMatch/>}/>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
