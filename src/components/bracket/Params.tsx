import { useActor } from "@xstate/react";
import { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    bracketAction({
      type: "CHANGE_VARIABLES",
      payload: {
        returnMatches: bracketState.context.variables.returnMatches,
        lastPlaceMatch,
        round,
      },
    });
  }, [lastPlaceMatch, round]);

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

  const returnMatches = bracketState.context.variables?.returnMatches;
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
        <input
          name={E_PLAY_OFFS_ROUND.FINAL}
          type={"checkbox"}
          checked={returnMatches[E_PLAY_OFFS_ROUND.FINAL]}
          onChange={(e) =>
            checkTheReturnMatch(E_PLAY_OFFS_ROUND.FINAL, e.target.checked)
          }
        />
        F
        <input
          name="SF"
          type={"checkbox"}
          checked={returnMatches[E_PLAY_OFFS_ROUND.SEMI_FINAL]}
          onChange={(e) =>
            checkTheReturnMatch(E_PLAY_OFFS_ROUND.SEMI_FINAL, e.target.checked)
          }
        />
        SF
        <input
          name="QF"
          type={"checkbox"}
          checked={returnMatches[E_PLAY_OFFS_ROUND.QUARTER_FINAL]}
          onChange={(e) =>
            checkTheReturnMatch(
              E_PLAY_OFFS_ROUND.QUARTER_FINAL,
              e.target.checked
            )
          }
        />
        QF
        <input
          name="16"
          type={"checkbox"}
          checked={returnMatches["1/16"]}
          onChange={(e) => checkTheReturnMatch("1/16", e.target.checked)}
        />
        1/16
      </SubMenuContainer>
    </>
  );
};

export default Params;
