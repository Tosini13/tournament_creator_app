import { useContext } from "react";
import { useActor } from "@xstate/react";
import styled from "@emotion/styled";
import TeamsList from "../teams/List";
import { GlobalStateContext } from "../../state";
import { useTeamsService } from "../../services/teams-service";
import Params from "../bracket/Params";
import { Typography } from "@mui/material";

const MenuDiv = styled.div`
  border-left: black 1px solid;
`;

export const SubMenuContainer = styled.div`
  padding: 2px 5px;
`;

export const TypographyHeader = styled(Typography)`
  border-bottom: black 1px solid;
  background-color: gray;
  color: white;
  padding: 2px 3px;
  margin: 5px 0px;
`;

type TMenuProps = {};

const Menu: React.FC<TMenuProps> = () => {
  const { teams, chosen } = useTeamsService();
  const { bracketService } = useContext(GlobalStateContext);
  const [bracketState] = useActor(bracketService);

  return (
    <MenuDiv>
      <TypographyHeader style={{ marginTop: "0px" }}>Teams</TypographyHeader>
      <SubMenuContainer>
        <TeamsList teams={teams} checkedTeams={chosen} />
      </SubMenuContainer>
      <Params variables={bracketState.context.variables} />
    </MenuDiv>
  );
};

export default Menu;
