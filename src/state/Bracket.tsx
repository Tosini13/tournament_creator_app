import { useInterpret } from "@xstate/react";
import { createContext } from "react";
import { TPlaceholderGameTeam } from "tournament_creator";
import { createMachine, assign, InterpreterFrom } from "xstate";

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
  // {
  //   game: { gameNumber: 2, roundName: E_PLAY_OFFS_ROUND.SEMI_FINAL },
  //   promotionType: "winner",
  // },
};

const chooseGame = assign<TBracketStateContext, TBracketStateEvent>({
  game: (_context, event) => event.game ?? null,
});

const clearGame = assign<TBracketStateContext, TBracketStateEvent>({
  game: () => null,
});

export const bracketMachine = createMachine<TBracketStateContext>(
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

export const BrackeStateContext = createContext({
  bracketService: {} as InterpreterFrom<typeof bracketMachine>,
});

export const BracketStateProvider: React.FC = ({ children }) => {
  const bracketService = useInterpret(bracketMachine);

  return (
    <BrackeStateContext.Provider value={{ bracketService }}>
      {children}
    </BrackeStateContext.Provider>
  );
};
