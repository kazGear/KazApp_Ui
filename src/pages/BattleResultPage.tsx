import styled from "styled-components";
import Select from "../components/common/Select";
import FromToDate from "../components/common/FromTo";
import Button from "../components/common/Button";
import MonsterTypesList from "../components/BattleResultPage/MonsterTypesList";
import { ChangeEvent, useCallback, useState } from "react";
import { useServerWithQuery } from "../hooks/common/useServerWithQuery";
import { COLORS, URL } from "../lib/Constants";
import { BattleReportDTO, MonsterReportDTO } from "../types/BattleReport";
import MonsterReport from "../components/BattleResultPage/MonsterReport";
import BattleReport from "../components/BattleResultPage/BattleReport";
import BattleScaleList from "../components/BattleResultPage/BattleScaleList";

const SdivOutsideFrame = styled.div`
    margin-top: 10px;
    height: 100%;
`;
const SdivOptionFrame = styled.div`
    display: flex;
    justify-content: space-around;
    height: 120px;
    margin: 0 20px 20px 20px;
`;
const SdivOption = styled.div`
    width: 45%;
    height: 100%;
    position: relative;
`;
const SdivReportFrame = styled.div`
    display: flex;
    justify-content: space-around;
`;
const SdivReport = styled.div`
    width: 45%;
    max-height: 450px;
    overflow-y: scroll;
`;
const Sh1Title = styled.h1`
    font-size: 16px;
    color: ${COLORS.MAIN_FONT_COLOR};
    margin-top: 5px;
`;

const BattleResultPage = () => {
    const [monsterReport, setMonsterReport] = useState<MonsterReportDTO[]>([]);
    const [battleReport, setBattleReport] = useState<BattleReportDTO[]>([]);
    const [monsterTypeId, setMonsterTypeId] = useState("0");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [battleScale, setBattleScale] = useState("0");
    const [disable, setDisable] = useState(false);
    const fetchServerUseQuery = useServerWithQuery();

    // モンスタ毎のレポートを取得
    const fetchMonsterReportHandler = useCallback(async () => {
        const monsterReport: MonsterReportDTO[]
            = await fetchServerUseQuery(
                URL.MONSTER_REPORTS + `?monsterTypeId=${monsterTypeId}`
            );
        setMonsterReport(monsterReport);
    }, [monsterTypeId]);

    // 戦闘毎のレポートを取得
    const fetchBattleReportHandler = useCallback(async () => {
        const battleReport: BattleReportDTO[]
            = await fetchServerUseQuery(
                   URL.BATTLE_REPORTS
                + `?battleScale=${battleScale}&from=${from}&to=${to}`
            );
        setBattleReport(battleReport);
    }, [battleScale, from, to]);

    const changeBattleScaleHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setBattleScale(e.target.value);
    }

    return (
        <SdivOutsideFrame>
            <SdivOptionFrame>
                <SdivOption>
                    <Sh1Title>モンスター戦績</Sh1Title>
                    <MonsterTypesList setMonsterTypeId={setMonsterTypeId}/>
                    <Button text="検索"
                            onClick={fetchMonsterReportHandler}
                            styleObj={{
                                position: "absolute",
                                bottom: "0",
                                right: "0"
                            }}
                            />
                </SdivOption>

                <SdivOption>
                    <Sh1Title>戦闘結果</Sh1Title>
                    <BattleScaleList changeBattleScaleHandler={changeBattleScaleHandler}/>
                    <FromToDate labelText="期間"
                                setDisable={setDisable}
                                from={from} setFrom={setFrom}
                                to={to} setTo={setTo} />
                    <Button text="検索"
                            onClick={fetchBattleReportHandler}
                            disabled={disable}
                            styleObj={{
                                position: "absolute",
                                bottom: "0",
                                right: "0"
                            }}
                            />
                </SdivOption>
            </SdivOptionFrame>

            <SdivReportFrame>
                <SdivReport>
                    <MonsterReport monsterReport={monsterReport}/>
                 </SdivReport>

                <SdivReport>
                    <BattleReport battleReport={battleReport} />
                </SdivReport>
            </SdivReportFrame>
        </SdivOutsideFrame>
    );
}

export default BattleResultPage;