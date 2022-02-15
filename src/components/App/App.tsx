import React, {useEffect} from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import Layout from '../layout/Layout/Layout';
import NoMatch from '../pages/NoMatch/NoMatch';
import Main from '../pages/Main/Main';
import CompetitionList from '../pages/CompetitionList/CompetitionList';
import Competition from '../pages/Competition/Competition';
import TeamList from '../pages/TeamList/TeamList';
import Team from '../pages/Team/Team';
import {loadCompetitionList} from '../../utils';

const App: React.FC = () => {
  useEffect(() => {
    loadCompetitionList().then((competitionList) => console.log(competitionList));
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path="competition_list" element={<CompetitionList/>}/>
          <Route path="competition/:id" element={<Competition/>}/>
          <Route path="team_list" element={<TeamList/>}/>
          <Route path="team/:id" element={<Team/>}/>
          <Route path="*" element={<NoMatch/>}/>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
