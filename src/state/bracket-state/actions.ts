import { createBracket, TCreateBracketProps } from "tournament_creator";
import { assign } from "xstate";
import { createBracketByStep, TBracketStateContext } from "./Bracket";

type TEvent = {
  type: string;
  payload?: TCreateBracketProps;
};

export const changeVariables = assign<TBracketStateContext, TEvent>({
  variables: (context, event) => event.payload ?? context.variables,
  createBracket: (context, event) =>
    event.payload
      ? createBracketByStep(event.payload)
      : createBracketByStep(context.variables),
});
