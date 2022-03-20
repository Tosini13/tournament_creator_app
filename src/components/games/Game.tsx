import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { TGame, TPlaceholderGameTeam } from "tournament_creator";

import styled from "@emotion/styled";

const Typo = styled(Typography)`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 3px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

type TGameProps = { game: TGame };

const Game: React.FC<TGameProps> = ({ game }) => {
  const onHover = (placeholder?: TPlaceholderGameTeam) => {
    console.log(placeholder);
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
    <Box border={"solid 0.5px rgba(0,0,0,0.7)"} borderRadius="5px">
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
          {`${props.game.round}${
            props.game.branch ? " " + props.game.branch : ""
          } ${props.game.gameNumber}`}
        </Typography>
        <Component {...props} />
      </Box>
    );
