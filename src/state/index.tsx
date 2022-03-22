import { useInterpret } from "@xstate/react";
import { createContext } from "react";
import { InterpreterFrom } from "xstate";
import { gameMachine } from "./Bracket";
import { bracketMachine } from "./bracket-state/Bracket";
import { teamsMachine } from "./team-state/Teams";

export const GlobalStateContext = createContext({
  gameService: {} as InterpreterFrom<typeof gameMachine>,
  teamsService: {} as InterpreterFrom<typeof teamsMachine>,
  bracketService: {} as InterpreterFrom<typeof bracketMachine>,
});

export const GlobalStateProvider: React.FC = ({ children }) => {
  const gameService = useInterpret(gameMachine);
  const teamsService = useInterpret(teamsMachine);
  const bracketService = useInterpret(bracketMachine);

  return (
    <GlobalStateContext.Provider
      value={{ gameService, teamsService, bracketService }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
