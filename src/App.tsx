import { Stack } from "@mui/material";
import { useTeamsService } from "./services/teams-service";
import { createBracket, TGame } from "tournament_creator";
import Round from "./components/bracket/Round";
import Game, { withRoundName } from "./components/games/Game";

function App() {
  const teams = useTeamsService(16);

  const bracket = createBracket({
    round: "1/16",
    teams,
    lastPlaceMatch: 80,
    returnMatches: [false, true],
  });

  const roundNames = Array.from(new Set(bracket.map((game) => game.round)));

  const GameWithRound = withRoundName(Game);

  return (
    <div className="App" style={{ padding: "5px" }}>
      <Stack direction={"row"} spacing={4}>
        {roundNames.map((roundName) => (
          <Round key={roundName} roundName={roundName}>
            {bracket
              .filter((game) => game.round === roundName)
              .sort(sortByRound)
              .map((game) => (
                <GameWithRound
                  game={game}
                  key={`${game.round}_${game.branch}_${game.gameNumber}`}
                />
              ))}
          </Round>
        ))}
      </Stack>
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
