import React from "react";

import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const Typo = styled(Typography)``;

export type TTeamProps = {
  name: string;
};

const Team: React.FC<TTeamProps> = ({ name }) => {
  return <Typo>{name}</Typo>;
};

export default Team;
