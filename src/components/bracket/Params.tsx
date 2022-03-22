import { useActor } from "@xstate/react";
import { useContext, useEffect, useState } from "react";
import { TCreateBracketProps } from "tournament_creator";
import {
  TRoundName,
  E_PLAY_OFFS_ROUND,
} from "tournament_creator/lib/playOffs/types";
import { GlobalStateContext } from "../../state";

type TParamsProps = {
  variables: TCreateBracketProps;
};

const Params: React.FC<TParamsProps> = ({ variables }) => {
  const { bracketService } = useContext(GlobalStateContext);
  const [, bracketAction] = useActor(bracketService);

  const [round, setRound] = useState<TRoundName>(variables.round);
  const [lastPlaceMatch, setLastPlaceMatch] = useState<number>(
    variables.lastPlaceMatch ?? 1
  );

  useEffect(() => {
    bracketAction({
      type: "CHANGE_VARIABLES",
      payload: { ...variables, lastPlaceMatch, round },
    });
  }, [lastPlaceMatch, round]);

  return (
    <div>
      <p>Params</p>
      <p>Round: {round}</p>
      <select
        value={round}
        onChange={(e) => setRound(e.target.value as TRoundName)}
      >
        <option value={E_PLAY_OFFS_ROUND.FINAL}>FINAL</option>
        <option value={E_PLAY_OFFS_ROUND.SEMI_FINAL}>SEMI FINAL</option>
        <option value={E_PLAY_OFFS_ROUND.QUARTER_FINAL}>QUARTER FINAL</option>
        <option value={"1/16"}>1/16</option>
      </select>
      <p>Last place match: {lastPlaceMatch}</p>
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
    </div>
  );
};

export default Params;
