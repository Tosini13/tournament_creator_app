import React from "react";
import { TPlaceholderGameTeam } from "tournament_creator";
import Team, { TTeamProps } from "./Team";

const getPlaceholder = (placeholder: TPlaceholderGameTeam) =>
  placeholder.game.roundName +
  " " +
  (placeholder.game.branch ? ` ${placeholder.game.branch}` : "") +
  " " +
  placeholder.game.gameNumber +
  " " +
  placeholder.promotionType;

type TWithPlaceholderProps = {
  placeholder?: TPlaceholderGameTeam;
};

const withPlaceholder =
  (Component: React.ComponentType<TTeamProps>) =>
  ({ placeholder }: TWithPlaceholderProps) => {
    if (!placeholder) {
      return <Component name={"NO_PLACEHOLDER"} />;
    }
    return <Component name={getPlaceholder(placeholder)} />;
  };

export const TeamPlaceholder = withPlaceholder(Team);
