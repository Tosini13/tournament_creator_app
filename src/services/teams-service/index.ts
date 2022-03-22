import { useActor } from "@xstate/react";
import { useContext } from "react";
import { TTeam } from "tournament_creator";
import { GlobalStateContext } from "../../state";

export const useTeamsService = (qty?: number) => {
  const { teamsService } = useContext(GlobalStateContext);
  const [state] = useActor(teamsService);
  return state.context.teams.slice(0, qty);
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

  return {
    changeName,
  };
};
