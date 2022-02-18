export type CalendarType = 'competitions' | 'teams';

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

export type TCompetitionPayload = {
  competitions: Array<TCompetition>
}

export type TTeamPayload = {
  teams: Array<TTeam>
}

export type TCompetitionCalendarPayload = {
  competition: {
    id: number,
    name: string,
  },
  matches: Array<TMatch>
}

