import styled from "styled-components";
import MessageWindow from "../components/battlePage/MessageWindow";
import MonsterWindow from "../components/battlePage/MonsterWindow";
import { useCallback, useRef, useState } from "react";
import BattleStartContents from "../components/battlePage/BattleStartContents";
import BattleResultContents from "../components/battlePage/BattleResultContents";
import DialogFrame from "../components/common/DialogFrame";
import BetContents from "../components/battlePage/BetContents";
import { useServerWithJson } from "../hooks/common/useServerWithJson";
import { URL } from "../lib/Constants";
import { useServerWithQuery } from "../hooks/common/useServerWithQuery";
import CommandButtons from "../components/battlePage/CommandButtons";
import useRegistResult from "../hooks/battle/useRegistResult";
import { isEmpty } from "../lib/CommonLogic";
import { MetaDataDTO, MonsterDTO } from "../types/MonsterBattle";

const SdivOutSideFrame = styled.div`
    position: relative;
    margin: 20px;
`;
const SdivMonsterWindowFrame = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

/** * モンスター１体分のログを作成 */
const createShortLog = (battleLog: MetaDataDTO[]): [MetaDataDTO[], number] => {
    const shortLog = [];
    let index = 0;

    for (const log of battleLog) {
        shortLog.push(log);
        index++;
        // モンスター１体分としてログを区切る
        if (log.IsStop || shortLog.length <= 0) {
            return [shortLog, index];
        }
    }
    // throw new Error("createShortLog ... error");
    return [shortLog, 0];
}

const BattlePage = () => {
    const [monsters, setMonsters] = useState<MonsterDTO[]>([]); // 戦闘モンスター
    const [monsterCount, setMonsterCount] = useState(0);
    const selectMonstersCount = useRef(2);
    const [betMonster, setBetMonster] = useState<MonsterDTO | null>(null);
    const [betGil, setBetGil] = useState(0);
    const [battleStarted, setBattleStarted] = useState(false);
    const [battleLog, setBattleLog] = useState<MetaDataDTO[]>([]); // １ターン・全モンスター文のログ
    const [shortLog, setShortLog] = useState<MetaDataDTO[]>([]); // １ターン・各モンスターのログ
    const [resultLog, setResultLog] = useState<MetaDataDTO | null>(null); // 勝敗結果
    const [showResultDialog, setShowResultDialog] = useState(false);
    const [showStartDialog, setShowStartDialog] = useState(true);
    const [showBetDialog, setShowBetDialog] = useState(false);
    const [showBattleView, setShowBattleView] = useState(false);

    // 戦闘モンスター数選択
    const selectMonstersCountHandler = useCallback((e: any) => {
        selectMonstersCount.current = e.target.value;
    }, []);

    // モンスタ－初期化
    const fecthMonsters = useServerWithQuery();
    const gameStartHandler = useCallback(async (e: any) => {
        const initMonsters = await fecthMonsters(
            URL.INIT_MONSTERS
            + `?selectMonstersCount=${selectMonstersCount.current}` // クエリパラメータ
        );
        setMonsters(initMonsters);
        setMonsterCount(initMonsters.length);
        // 画面切り替え
        setShowStartDialog(false);
        setShowBetDialog(true);
        setShowBattleView(true);
    }, [])

    // 全モンスターが行動
    const moveMonsters = useServerWithJson();
    const battleHandler = async () => {
        const moveResult =
            await moveMonsters([...monsters], URL.BATTLE_NEXT_TURN);
        setMonsters([...moveResult.Monsters]);
        setBattleLog([...moveResult.BattleLog]);
        setBattleStarted(true);
        setMonsterCount([...moveResult.Monsters].length);
    }

    // 各モンスターのターン送り
    const registResult = useServerWithJson();
    const registBattleResult = useRegistResult();
    const nextTurnHandler = () => {
        // 例外処理・空の配列が流れてくることがある
        if (isEmpty(battleLog)) {
            setMonsterCount(0); // ボタン状態初期化
            return;
        }
        const [shortLog, index] = createShortLog([...battleLog]); // モンスター１体分のログ
        setShortLog([...shortLog]);

        const afterLog = battleLog.slice(index); // 残りのログ

        setBattleLog([...afterLog]);
        setMonsterCount(monsterCount - 1);
        setBattleStarted(false);

        if (shortLog.length <= 0) return;

        // 勝敗判定
        registBattleResult(
            monsters,
            shortLog.pop(),
            setResultLog,
            setShowResultDialog,
            registResult
        );

    }

    // ゲーム開始ダイアログの内容
    const renderBattleStartContents = () => {
        return <BattleStartContents
                    battleStartHandler={gameStartHandler}
                    selectMonstersCountHandler={selectMonstersCountHandler}
                    showDialog={showStartDialog} />
    }
    // 賭け選択画面の内容
    const renderBetContents = () => {
        return <BetContents
                    monsters={monsters}
                    setBetMonster={setBetMonster}
                    setBetGil={setBetGil}
                    showDialog={setShowBetDialog} />
    }
    // 戦闘結果ダイアログの内容
    const renderBattleResultContents = () => {
        return <BattleResultContents
                    log={resultLog}
                    betMonster={betMonster}
                    betGil={betGil} />
    }

    return (
        <>
            <SdivOutSideFrame style={{display: showBattleView ? "block" : "none"}} >
                <SdivMonsterWindowFrame>
                    {
                        monsters.map((monster, index) => (
                            <MonsterWindow
                                monster={monster}
                                shortLog={shortLog}
                                key={(monster.MonsterId + `_${index}`)}
                                />
                        ))
                    }
                </SdivMonsterWindowFrame>
                <CommandButtons
                    battleStartHandler={battleHandler}
                    nextTurnHandler={nextTurnHandler}
                    monsterCount={monsterCount}
                    battleStarted={battleStarted}
                    />
                <MessageWindow
                    shortLog={shortLog}
                    />
            </SdivOutSideFrame>
            {/* 開始ダイアログ */}
            <DialogFrame
                renderChild={renderBattleStartContents}
                showDialog={showStartDialog}
                />
            {/* 賭けダイアログ */}
            <DialogFrame
                renderChild={renderBetContents}
                showDialog={showBetDialog}
                showFilter={true}
                />
            {/* 終了ダイアログ */}
            <DialogFrame
                renderChild={renderBattleResultContents}
                showDialog={showResultDialog}
                />
        </>
    );
}

export default BattlePage;