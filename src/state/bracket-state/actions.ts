import { createBracket, TCreateBracketProps } from "tournament_creator";
import { assign } from "xstate";
import { TBracketStateContext } from "./Bracket";

type TEvent = {
  type: string;
  payload?: TCreateBracketProps;
};

export const changeVariables = assign<TBracketStateContext, TEvent>({
  variables: (context, event) => event.payload ?? context.variables,
  games: (context, event) =>
    event.payload ? createBracket(event.payload) : context.games,
});
