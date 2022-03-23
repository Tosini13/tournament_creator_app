import { TTeam } from "tournament_creator";
import { createMachine } from "xstate";
import { teams } from "../../services/teams-service/mockData";
import { changeTeamName, chooseTeam } from "./actions";

export type TTeamsStateContext = {
  teams: TTeam[];
  chosenTeams: string[];
};

export const teamsMachine = createMachine<TTeamsStateContext>(
  {
    initial: "CONTAIN",
    context: {
      teams,
      chosenTeams: teams.slice(0, 8).map((t) => t.id),
    },
    states: {
      CONTAIN: {
        on: {
          CHANGE_NAME: {
            actions: ["changeTeamName"],
          },
          CHOOSE: {
            actions: ["chooseTeam"],
          },
        },
      },
    },
  },
  {
    actions: {
      changeTeamName,
      chooseTeam,
    },
  }
);
