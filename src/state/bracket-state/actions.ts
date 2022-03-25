import { assign } from "xstate";
import {
  createBracketByStep,
  TBracketStateContext,
  TVariables,
} from "./Bracket";

type TEvent = {
  type: string;
  payload?: TVariables;
};

export const changeVariables = assign<TBracketStateContext, TEvent>({
  variables: (context, event) => event.payload ?? context.variables,
  createBracket: (context, event) => {
    return event.payload
      ? createBracketByStep(event.payload)
      : createBracketByStep(context.variables);
  },
});
