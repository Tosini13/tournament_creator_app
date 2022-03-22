import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { TTeam } from "tournament_creator";
import { useTeamsActions } from "../../services/teams-service";

type TListProps = {
  teams: TTeam[];
};

const List: React.FC<TListProps> = ({ teams }) => {
  return (
    <Stack spacing={1}>
      {teams.map((team) => (
        <TeamForm key={team.id} team={team} />
      ))}
    </Stack>
  );
};

export default List;

const TeamForm = ({ team }: { team: TTeam }) => {
  const { changeName } = useTeamsActions();
  const [name, setName] = useState(team.name);

  useEffect(() => {
    changeName({ name, id: team.id });
  }, [name, team.id]);

  return (
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
  );
};
