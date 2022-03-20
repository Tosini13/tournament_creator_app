import { useInterpret } from "@xstate/react";
import { createContext } from "react";
import { TGame, TPlaceholderGameTeam } from "tournament_creator";
import { createMachine } from "xstate";

const bracketMachine = createMachine({
  initial: "init",
  states: {
    init: {},
  },
});

type TBracketStateContext = {
  bracket?: TGame[];
  currentGame?: TPlaceholderGameTeam;
};

const initBracket: TBracketStateContext = {};

export const BrackeStateContext = createContext({});

export const BracketStateProvider: React.FC = ({ children }) => {
  const bracketService = useInterpret(bracketMachine);

  return (
    <BrackeStateContext.Provider value={bracketService}>
      {children}
    </BrackeStateContext.Provider>
  );
};
