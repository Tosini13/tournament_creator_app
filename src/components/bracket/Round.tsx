import { Stack, Typography } from "@mui/material";
import { TRoundName } from "tournament_creator/lib/playOffs/types";

type TRoundProps = {
  roundName: TRoundName;
};

const Round: React.FC<TRoundProps> = ({ children, roundName }) => {
  return (
    <Stack spacing={3}>
      <Typography textAlign={"center"}>{roundName}</Typography>
      <Stack spacing={1}>{children}</Stack>
    </Stack>
  );
};

export default Round;
