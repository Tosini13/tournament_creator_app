import { Grid } from "@mui/material";
import { useActor } from "@xstate/react";
import { useContext, useEffect, useMemo, useState } from "react";
import { getAllRounds } from "tournament_creator";
import {
  TRoundName,
  E_PLAY_OFFS_ROUND,
} from "tournament_creator/lib/playOffs/types";
import { GlobalStateContext } from "../../state";
import { SubMenuContainer, TypographyHeader } from "../menu/Menu";

type TParamsProps = {};

const Params: React.FC<TParamsProps> = () => {
  const { bracketService } = useContext(GlobalStateContext);
  const [bracketState, bracketAction] = useActor(bracketService);

  const [round, setRound] = useState<TRoundName>(
    bracketState.context.variables.round
  );
  const [lastPlaceMatch, setLastPlaceMatch] = useState<number>(
    bracketState.context.variables.lastPlaceMatch ?? 1
  );

  const returnMatches = bracketState.context.variables?.returnMatches;

  useEffect(() => {
    bracketAction({
      type: "CHANGE_VARIABLES",
      payload: {
        returnMatches,
        lastPlaceMatch,
        round,
      },
    });
  }, [lastPlaceMatch, round, returnMatches]);

  const checkTheReturnMatch = (index: TRoundName, isChecked: boolean) => {
    bracketAction({
      type: "CHANGE_VARIABLES",
      payload: {
        ...bracketState.context.variables,
        returnMatches: {
          ...bracketState.context.variables.returnMatches,
          [index]: isChecked,
        },
      },
    });
  };

  const allRounds = useMemo(() => getAllRounds(round), [round]);
  return (
    <>
      <TypographyHeader>Rounds</TypographyHeader>
      <SubMenuContainer>
        <select
          value={round}
          onChange={(e) => setRound(e.target.value as TRoundName)}
        >
          <option value={E_PLAY_OFFS_ROUND.FINAL}>FINAL</option>
          <option value={E_PLAY_OFFS_ROUND.SEMI_FINAL}>SEMI FINAL</option>
          <option value={E_PLAY_OFFS_ROUND.QUARTER_FINAL}>QUARTER FINAL</option>
          <option value={"1/16"}>1/16</option>
        </select>
      </SubMenuContainer>
      <TypographyHeader>Last place match:</TypographyHeader>
      <SubMenuContainer>
        <input
          type={"number"}
          value={lastPlaceMatch}
          onChange={(e) =>
            setLastPlaceMatch((prev) => {
              const cur = Number(e.target.value);
              if (cur > prev) {
                return cur + 1;
              }
              return cur - 1;
            })
          }
        />
      </SubMenuContainer>
      <TypographyHeader>Return Matches:</TypographyHeader>
      <SubMenuContainer>
        <Grid container>
          {Object.entries(returnMatches)
            .filter(([round]) => allRounds.includes(round as TRoundName))
            .map(([round, value]) => (
              <Grid item xs={6} key={round}>
                <input
                  id={round}
                  name={round}
                  type={"checkbox"}
                  checked={value}
                  onChange={(e) =>
                    checkTheReturnMatch(round as TRoundName, e.target.checked)
                  }
                />
                <label htmlFor={round}>{round}</label>
              </Grid>
            ))}
        </Grid>
      </SubMenuContainer>
    </>
  );
};

export default Params;
