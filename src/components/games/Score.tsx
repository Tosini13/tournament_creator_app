import { Divider, Stack, Typography } from "@mui/material";

type TScoreProps = {
  home?: number;
  away?: number;
};

const Score: React.FC<TScoreProps> = ({ home, away }) => {
  return (
    <Stack style={{ minWidth: "20px" }} alignItems={"center"}>
      <Typography>{home}</Typography>
      <Divider />
      <Typography>{away}</Typography>
    </Stack>
  );
};

export default Score;
