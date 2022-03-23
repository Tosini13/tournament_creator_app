import { useActor } from "@xstate/react";
import { useContext } from "react";
import { TTeam } from "tournament_creator";
import { GlobalStateContext } from "../../state";
import { TEventChooseTeamPayload } from "../../state/team-state/actions";

export const useTeamsService = () => {
  const { teamsService } = useContext(GlobalStateContext);
  const [state] = useActor(teamsService);
  return {
    teams: state.context.teams,
    chosen: state.context.chosenTeams,
  };
};

export const useGetTeam = (id: string) => {
  const { teamsService } = useContext(GlobalStateContext);
  const [state] = useActor(teamsService);

  return state.context.teams.find((team) => team.id === id);
};

export const useTeamsActions = () => {
  const { teamsService } = useContext(GlobalStateContext);
  const [, send] = useActor(teamsService);

  const changeName = (payload: TTeam) => {
    send({
      type: "CHANGE_NAME",
      payload,
    });
  };

  const chooseTeam = (payload: TEventChooseTeamPayload) => {
    send({
      type: "CHOOSE",
      payload,
    });
  };

  return {
    changeName,
    chooseTeam,
  };
};
