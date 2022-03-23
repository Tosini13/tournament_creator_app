import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { TTeam } from "tournament_creator";
import { useTeamsActions } from "../../services/teams-service";

type TListProps = {
  teams: TTeam[];
  checkedTeams: string[];
};

const List: React.FC<TListProps> = ({ teams, checkedTeams }) => {
  return (
    <Stack spacing={1}>
      {teams.map((team) => (
        <TeamForm
          key={team.id}
          team={team}
          checked={Boolean(checkedTeams.includes(team.id))}
        />
      ))}
    </Stack>
  );
};

export default List;

const TeamForm = ({ team, checked }: { team: TTeam; checked: boolean }) => {
  const { changeName, chooseTeam } = useTeamsActions();
  const [name, setName] = useState(team.name);

  useEffect(() => {
    changeName({ name, id: team.id });
  }, [name, team.id]);

  const check = (checked: boolean) =>
    chooseTeam({ id: team.id, isChecked: checked });

  return (
    <Stack direction={"row"} spacing={1}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => check(e.target.checked)}
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Stack>
  );
};
