import {
  createBracket,
  TCreateBracketProps,
  TGame,
  TPlaceholderGameTeam,
  TTeam,
} from "tournament_creator";
import { createMachine } from "xstate";
import { changeVariables } from "./actions";

export type TGameRelation = TPlaceholderGameTeam;

export type TVariables = Omit<TCreateBracketProps, "teams">;

export type TBracketStateContext = {
  createBracket: (teams: TTeam[]) => TGame[];
  variables: TVariables;
};

export const createBracketByStep =
  (variables: TVariables) => (teams: TTeam[]) =>
    createBracket({ teams, ...variables });

const initVariables: TVariables = {
  round: "1/16",
  lastPlaceMatch: 1,
  returnMatches: [false, true],
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
