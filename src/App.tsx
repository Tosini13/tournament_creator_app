import { useContext, useMemo } from "react";
import { Grid, Stack } from "@mui/material";
import { useTeamsService } from "./services/teams-service";
import { createBracket, TGame } from "tournament_creator";
import Round from "./components/bracket/Round";
import Game, { withRoundName } from "./components/games/Game";
import { useActor } from "@xstate/react";
import { TGameRelation } from "./state/Bracket";
import { GlobalStateContext } from "./state";
import TeamsList from "./components/teams/List";
import Params from "./components/bracket/Params";

function App() {
  const { gameService, bracketService } = useContext(GlobalStateContext);
  const [gameState] = useActor(gameService);
  const [bracketState] = useActor(bracketService);

  const isChosen = gameState.matches("chosen");

  const teams = useTeamsService(16);

  const bracket = bracketState.context.games;

  const roundNames = Array.from(new Set(bracket.map((game) => game.round)));

  const GameWithRound = withRoundName(Game);

  const highlitghtedGames = useMemo(() => {
    if (!isChosen || !gameState.context.game || !bracket) {
      return [];
    }
    return getRelatedGames(gameState.context.game, bracket);
  }, [gameState.context.game, bracket, isChosen]);

  return (
    <div className="App" style={{ padding: "5px" }}>
      <Grid container spacing={2}>
        <Grid item>
          <Stack direction={"row"} spacing={4}>
            {roundNames.map((roundName) => (
              <Round key={roundName} roundName={roundName}>
                {bracket
                  .filter((game) => game.round === roundName)
                  .sort(sortByRound)
                  .map((game) => (
                    <GameWithRound
                      game={game}
                      highlighted={Boolean(
                        highlitghtedGames.find(isTheGame(game))
                      )}
                      key={`${game.round}_${game.branch}_${game.gameNumber}`}
                    />
                  ))}
              </Round>
            ))}
          </Stack>
        </Grid>
        <Grid item>
          <TeamsList teams={teams} />
          <Params variables={bracketState.context.variables} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

const sortByRound = (gameA: TGame, gameB: TGame) => {
  if ((gameA.branch ?? "A") > (gameB.branch ?? "A")) {
    return 1;
  }
  if ((gameA.branch ?? "A") < (gameB.branch ?? "A")) {
    return -1;
  }
  if (gameA.gameNumber > gameB.gameNumber) {
    return 1;
  }
  if (gameA.gameNumber < gameB.gameNumber) {
    return -1;
  }
  return 0;
};

const getRelatedGames = (game: TGameRelation, bracket: TGame[]) => {
  if (!game.game) {
    return [];
  }
  const found = bracket.find(hasGameRelation(game));
  let arr: (TGame | undefined)[][] = [[found]];
  while (lastElementOf(arr).some((g) => g?.match.placeholderGame)) {
    const prevHomeRound = lastElementOf(arr).map((g) =>
      bracket.filter(hasGameRelation(g?.match.placeholderGame?.home))
    );
    const prevAwayRound = lastElementOf(arr).map((g) =>
      bracket.filter(hasGameRelation(g?.match.placeholderGame?.away))
    );
    arr = [...arr, [...prevHomeRound.flat(), ...prevAwayRound.flat()]];
  }
  return arr.flat();
};

const hasGameRelation = (g1?: TGameRelation) => (g2?: TGame) =>
  g1?.game.roundName === g2?.round &&
  g1?.game.branch === g2?.branch &&
  g1?.game.gameNumber === g2?.gameNumber;
const lastElementOf = (arr: (TGame | undefined)[][]) => arr[arr.length - 1];

const isTheGame = (g1?: TGame) => (g2?: TGame) =>
  g1?.round === g2?.round &&
  g1?.branch === g2?.branch &&
  g1?.gameNumber === g2?.gameNumber;
