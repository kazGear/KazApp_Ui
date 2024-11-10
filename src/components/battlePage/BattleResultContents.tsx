import styled from "styled-components";
import { COLORS } from "../../lib/Constants";
import Button from "../common/Button";
import { MetaDataDTO, MonsterDTO } from "../../types/MonsterBattle";

const SpLine = styled.p`
    color: lightpink;
    line-height: 0.5;
    margin: 5px 0 0 0;
`;
const SdivBetResultFrame = styled.div`
    height: 25%;
    text-align: center;
    align-content: center;
`;
const SdivButtonFrame = styled.div`
    height: 25%;
    text-align: end;
    align-content: flex-end;
`;

const gamesetHandler = () => {
    window.location.reload();
}

interface ArgProps {
    log: MetaDataDTO | null;
    betMonster: MonsterDTO | null;
    betGil: number;
}

const BattleResultContents = (
     {log, betMonster, betGil}: ArgProps
    ) => {
    const strike = log && betMonster &&
        log.WinnerMonsterId === betMonster.MonsterId;

    return (
        <>
        {log &&
            <>
            <SpLine>
                {
                    log.ExistWinner
                    ? `■＋■＋■＋■＋■＋■＋■＋■＋■＋■＋■＋■＋■＋`
                    : ""
                }
            </SpLine>
            <SpLine>
                {
                    log.ExistWinner
                    ? `＋■＋■＋■＋■＋■＋■＋■＋■＋■＋■＋■＋■＋■`
                    : ""
                }
            </SpLine>
            <h1 style={{ color: COLORS.MAIN_FONT_COLOR }}>
                {
                    log.ExistWinner
                    ? `Winner: ${log.WinnerMonsterName} !!`
                    : ""
                }
            </h1>
            <SpLine>
                {
                    log.ExistWinner
                    ? `■＋■＋■＋■＋■＋■＋■＋■＋■＋■＋■＋■＋■＋`
                    : ""
                }
            </SpLine>
            <SpLine>
                {
                    log.ExistWinner
                    ? `＋■＋■＋■＋■＋■＋■＋■＋■＋■＋■＋■＋■＋■`
                    : ""
                }
            </SpLine>

            <h1>{log.AllLoser ? "draw ..." : ""}</h1>

            <SdivBetResultFrame>
                <h2>(∩´∀｀)∩獲得賞金：
                {
                    strike ? Math.floor(betGil * betMonster.BetRate) : 0
                } Gil
                </h2>
            </SdivBetResultFrame>

            <SdivButtonFrame>
                <Button text={"終了"} width={120} onClick={gamesetHandler}/>
            </SdivButtonFrame>
            </>
        }
        </>
    );
};
export default BattleResultContents;