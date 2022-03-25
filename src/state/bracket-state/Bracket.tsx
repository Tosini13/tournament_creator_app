import {
  createBracket,
  E_PLAY_OFFS_ROUND,
  TCreateBracketProps,
  TGame,
  TPlaceholderGameTeam,
  TRoundName,
  TTeam,
} from "tournament_creator";
import { createMachine } from "xstate";
import { changeVariables } from "./actions";

export type TGameRelation = TPlaceholderGameTeam;

export type TVariables = Omit<
  TCreateBracketProps,
  "teams" | "returnMatches"
> & { returnMatches: { [key: TRoundName | string]: boolean } };

export type TBracketStateContext = {
  createBracket: (teams: TTeam[]) => TGame[];
  variables: TVariables;
};

export const createBracketByStep =
  (variables: TVariables) => (teams: TTeam[]) =>
    createBracket({
      teams,
      ...variables,
      returnMatches: Object.values(variables.returnMatches).reverse(),
    });

const initVariables: TVariables = {
  round: "1/16",
  lastPlaceMatch: 1,
  returnMatches: {
    FINAL: true,
    SEMI_FINAL: false,
    QUARTER_FINAL: true,
    "1/16": false,
  },
};

const initBracket: TBracketStateContext = {
  createBracket: createBracketByStep(initVariables),
  variables: initVariables,
};

export const bracketMachine = createMachine<TBracketStateContext>(
  {
    initial: "CREATED",
    context: initBracket,
    states: {
      CREATED: {
        on: {
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
