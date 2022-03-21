import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { TGame, TPlaceholderGameTeam } from "tournament_creator";

import styled from "@emotion/styled";
import { useActor } from "@xstate/react";
import { BrackeStateContext } from "../../state/Bracket";

const Typo = styled(Typography)`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 3px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

type TGameProps = { game: TGame; highlighted?: boolean };

const Game: React.FC<TGameProps> = ({ game, highlighted }) => {
  const bracketServices = useContext(BrackeStateContext);
  const [, send] = useActor(bracketServices.bracketService);

  const onHover = (placeholder?: TPlaceholderGameTeam) => {
    send({
      type: "CHOOSE",
      game: {
        ...placeholder,
        round: placeholder?.game.roundName,
      },
    });
  };

  const onLeave = () => {
    send("CLEAR");
  };

  const homeTeam = React.useMemo(
    () =>
      game.match.homeTeam ??
      (game.match.placeholderGame?.home &&
        getPlaceholder(game.match.placeholderGame.home)),
    [game.match.homeTeam, game.match.placeholderGame?.home]
  );

  const awayTeam = React.useMemo(
    () =>
      game.match.awayTeam ??
      (game.match.placeholderGame?.away &&
        getPlaceholder(game.match.placeholderGame.away)),
    [game.match.awayTeam, game.match.placeholderGame?.away]
  );

  return (
    <Box
      border={
        highlighted
          ? "solid 0.2px rgba(0,0,0,0.8)"
          : "solid 0.2px rgba(0,0,0,0.4)"
      }
      borderRadius="5px"
      boxShadow={highlighted ? "1px 1px 5px rgba(0,0,0,0.6)" : undefined}
      onMouseLeave={() => onLeave()}
    >
      <Stack>
        <Typo onMouseEnter={() => onHover(game.match.placeholderGame?.home)}>
          {homeTeam}
        </Typo>
        <Divider />
        <Typo onMouseEnter={() => onHover(game.match.placeholderGame?.away)}>
          {awayTeam}
        </Typo>
      </Stack>
    </Box>
  );
};

export default Game;

const getPlaceholder = (placeholder: TPlaceholderGameTeam) =>
  placeholder.game.roundName +
  " " +
  (placeholder.game.branch ? ` ${placeholder.game.branch}` : "") +
  " " +
  placeholder.game.gameNumber +
  " " +
  placeholder.promotionType;

export const withRoundName =
  (Component: React.ComponentType<TGameProps>) => (props: TGameProps) =>
    (
      <Box>
        <Typography fontSize={"13px"} textAlign={"right"}>
          {getRoundName(props.game)}
        </Typography>
        <Component {...props} />
      </Box>
    );

const getRoundName = (game: TGame) => {
  if (game.round === "FINAL") {
    return getFinalRoundName(game);
  }

  return `${game.round}${game.branch ? " " + game.branch : ""} ${
    game.gameNumber
  }`;
};

const getFinalRoundName = (game: TGame) =>
  `${game.branch ? (game.branch.charCodeAt(0) - 64) * 2 - 1 : 1} place`;
