import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import Layout from '../common/Layout/Layout';
import NoMatch from '../pages/NoMatch/NoMatch';
import Main from '../pages/Main/Main';
import CompetitionList from '../pages/CompetitionList/CompetitionList';
import Competition from '../pages/Competition/Competition';
import TeamList from '../pages/TeamList/TeamList';
import Team from '../pages/Team/Team';
import './App.scss';

const App: React.FC = () => {
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
