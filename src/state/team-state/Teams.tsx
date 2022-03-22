import { TTeam } from "tournament_creator";
import { createMachine } from "xstate";
import { teams } from "../../services/teams-service/mockData";
import { changeTeamName } from "./actions";

export type TTeamsStateContext = {
  teams: TTeam[];
};

export const teamsMachine = createMachine<TTeamsStateContext>(
  {
    initial: "CONTAIN",
    context: {
      teams,
    },
    states: {
      CONTAIN: {
        on: {
          CHANGE_NAME: {
            actions: ["changeTeamName"],
          },
        },
      },
    },
  },
  {
    actions: {
      changeTeamName,
    },
  }
);
