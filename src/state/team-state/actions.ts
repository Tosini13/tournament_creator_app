import { TTeam } from "tournament_creator";
import { assign } from "xstate";
import { TTeamsStateContext } from "./Teams";

type TEvent = {
  type: string;
  payload?: TTeam;
};

const getTeam = (id: string, name: string): TTeam => ({ id, name });

const changeTeamWithId = (event: TTeam) => (team: TTeam) =>
  team.id === event.id ? getTeam(event.id, event.name) : team;

export const changeTeamName = assign<TTeamsStateContext, TEvent>({
  teams: (context, event) =>
    event.payload
      ? context.teams.map(changeTeamWithId(event.payload))
      : context.teams,
});

export type TEventChooseTeamPayload = { id: string; isChecked: boolean };
type TEventChooseTeam = {
  type: string;
  payload?: TEventChooseTeamPayload;
};
export const chooseTeam = assign<TTeamsStateContext, TEventChooseTeam>({
  chosenTeams: (context, { payload }) => {
    if (!payload) {
      return context.chosenTeams;
    }
    if (payload.isChecked) {
      return [...context.chosenTeams, payload.id];
    }
    return context.chosenTeams.filter((id) => id !== payload.id);
  },
});
