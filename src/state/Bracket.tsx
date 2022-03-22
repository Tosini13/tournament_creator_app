import { TPlaceholderGameTeam } from "tournament_creator";
import { createMachine, assign } from "xstate";

export type TGameRelation = TPlaceholderGameTeam;

type TBracketStateContext = {
  game: TGameRelation | null;
};

type TBracketStateEvent = {
  type: string;
  game?: TGameRelation | null;
};

const initBracket: TBracketStateContext = {
  game: null,
};

const chooseGame = assign<TBracketStateContext, TBracketStateEvent>({
  game: (_context, event) => event.game ?? null,
});

const clearGame = assign<TBracketStateContext, TBracketStateEvent>({
  game: () => null,
});

export const gameMachine = createMachine<TBracketStateContext>(
  {
    initial: "notChosen",
    context: initBracket,
    states: {
      notChosen: {
        on: {
          CHOOSE: {
            target: "chosen",
            actions: ["choose"],
          },
        },
      },
      chosen: {
        on: {
          CLEAR: { target: "notChosen", actions: ["clear"] },
          CHOOSE: {
            target: "chosen",
            actions: ["choose"],
          },
        },
      },
    },
  },
  {
    actions: {
      choose: chooseGame,
      clear: clearGame,
    },
  }
);
