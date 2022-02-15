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

export type TCompetitionPayload = {
  count: number,
  competitions: Array<TCompetition>
}

export type TTeamPayload = {
  count: number,
  teams: Array<TTeam>
}
