import { useContext, useMemo } from "react";
import { Grid, Stack } from "@mui/material";
import { TGame } from "tournament_creator";
import Round from "./components/bracket/Round";
import Game, { withRoundName } from "./components/games/Game";
import { useActor } from "@xstate/react";
import { TGameRelation } from "./state/Bracket";
import { GlobalStateContext } from "./state";
import Menu from "./components/menu/Menu";

function App() {
  const { gameService, bracketService, teamsService } =
    useContext(GlobalStateContext);
  const [gameState] = useActor(gameService);
  const [bracketState] = useActor(bracketService);
  const [teamsState] = useActor(teamsService);

  const isChosen = gameState.matches("chosen");

  const bracket = bracketState.context.createBracket(
    teamsState.context.teams.filter((team) =>
      teamsState.context.chosenTeams.includes(team.id)
    )
  );

  const roundNames = Array.from(new Set(bracket.map((game) => game.round)));

  const GameWithRound = withRoundName(Game);

  const highlitghtedGames = useMemo(() => {
    if (!isChosen || !gameState.context.game || !bracket) {
      return [];
    }
    return getRelatedGames(gameState.context.game, bracket);
  }, [gameState.context.game, bracket, isChosen]);

  return (
    <div className="App">
      <Grid container>
        <Grid item style={{ flexGrow: 1 }}>
          <Stack direction={"row"} spacing={4} style={{ marginLeft: "5px" }}>
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
          <Menu />
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
