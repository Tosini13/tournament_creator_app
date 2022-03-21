import { teams } from "./mockData";

export const useTeamsService = (qty?: number) => {
  return teams.slice(0, qty);
};

export const useGetTeam = (id: string) => {
  return teams.find((team) => team.id === id);
};
