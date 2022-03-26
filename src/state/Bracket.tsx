import { TPlaceholderGameTeam } from "tournament_creator";
import { createMachine, assign } from "xstate";

export type TGameRelation = TPlaceholderGameTeam;

type TBracketStateContext = {
  game: TGameRelation | null;
  teamId: string | null;
};

const initBracket: TBracketStateContext = {
  game: null,
  teamId: null,
};

type TChooseTeamStateEvent = {
  type: string;
  teamId?: string | null;
};
const chooseTeam = assign<TBracketStateContext, TChooseTeamStateEvent>({
  teamId: (_context, event) => event.teamId ?? null,
});

const clearTeam = assign<TBracketStateContext>({
  teamId: () => null,
});

type TBracketStateEvent = {
  type: string;
  game?: TGameRelation | null;
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
          CHOOSE_TEAM: {
            target: "chosen",
            actions: ["chooseTeam"],
          },
        },
      },
      chosen: {
        on: {
          CLEAR: { target: "notChosen", actions: ["clear", "clearTeam"] },
          CHOOSE: {
            target: "chosen",
            actions: ["clearTeam", "choose"],
          },
          CHOOSE_TEAM: {
            target: "chosen",
            actions: ["clear", "chooseTeam"],
          },
        },
      },
    },
  },
  {
    actions: {
      choose: chooseGame,
      clear: clearGame,
      chooseTeam: chooseTeam,
      clearTeam: clearTeam,
    },
  }
);
