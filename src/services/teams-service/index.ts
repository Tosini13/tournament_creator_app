import { teams } from "./mockData";

export const useTeamsService = (qty: number) => {
  return teams.slice(0, qty);
};
