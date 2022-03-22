import {
  createBracket,
  TCreateBracketProps,
  TGame,
  TPlaceholderGameTeam,
} from "tournament_creator";
import { createMachine } from "xstate";
import { teams } from "../../services/teams-service/mockData";
import { changeVariables } from "./actions";

export type TGameRelation = TPlaceholderGameTeam;

export type TBracketStateContext = {
  games: TGame[];
  variables: TCreateBracketProps;
};

const initVariables: TCreateBracketProps = {
  round: "1/16",
  teams: teams,
  lastPlaceMatch: 1,
  returnMatches: [false, true],
};

const initBracket: TBracketStateContext = {
  games: createBracket(initVariables),
  variables: initVariables,
};

export const bracketMachine = createMachine<TBracketStateContext>(
  {
    initial: "CREATED",
    context: initBracket,
    states: {
      CREATED: {
        on: {
          //   CLEAR: { target: "EMPTY", actions: ["clear"] },
          CHANGE_VARIABLES: {
            target: "CREATED",
            actions: ["changeVariables"],
          },
        },
      },
    },
  },
  {
    actions: {
      changeVariables,
    },
  }
);
