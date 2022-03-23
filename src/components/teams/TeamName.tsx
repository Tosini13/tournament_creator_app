import React from "react";
import { useGetTeam } from "../../services/teams-service";
import Team, { TTeamProps } from "./Team";

type TWithTeamProps = {
  id: string;
};
const withTeamName =
  (Component: React.ComponentType<TTeamProps>) =>
  ({ id }: TWithTeamProps) => {
    const team = useGetTeam(id);

    return <Component name={team?.name ?? "NO_TEAM"} />;
  };

export const TeamName = withTeamName(Team);
