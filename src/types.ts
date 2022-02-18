// Типы календарей
export type DataType = 'competition' | 'team';

// Типы основных объектов
export type TCompetition = {
  id: number,
  name: string,
  emblemUrl: string,
  area: {
    name: string
  }
}

export type TTeam = {
  id: number,
  name: string,
  crestUrl: string
}

export type TMatch = {
  id: number,
  utcDate: string,
  status: string,
  homeTeam: {
    id: number,
    name: string
  },
  awayTeam: {
    id: number,
    name: string
  },
  score: {
    winner: string,
    fullTime: {
      homeTeam: number | null,
      awayTeam: number | null
    },
    extraTime: {
      homeTeam: number | null,
      awayTeam: number | null
    },
    penalties: {
      homeTeam: number | null,
      awayTeam: number | null
    }
  }
}

// Типы для возвращаемых API данных
export type TCompetitionListPayload = {
  competitions: Array<TCompetition>
}

export type TTeamListPayload = {
  teams: Array<TTeam>
}

export type TCompetitionCalendarPayload = {
  matches: Array<TMatch>
}

export type TTeamCalendarPayload = {
  matches: Array<TMatch>
}

// eslint-disable-next-line max-len
export type ApiPayload = TCompetitionListPayload | TTeamListPayload | TCompetitionCalendarPayload | TTeamCalendarPayload;

// Тип для контекста
export type TContextType = {
  competitionList: Array<TCompetition>,
  teamList: Array<TTeam>
}
