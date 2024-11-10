import styled from "styled-components";
import Button from "../common/Button";
import MonsterCountSelector from "./MonsterCountSelector";

const SdivButtonFrame = styled.div`
    height: 50%;
    align-content: flex-end;
    text-align: end;
`;

interface ArgProps {
    battleStartHandler: (e: any) => Promise<void>;
    selectMonstersCountHandler: (e: any) => void;
    showDialog: boolean;
}

const BattleStartContents = ({
    battleStartHandler, selectMonstersCountHandler, showDialog}: ArgProps
) => {
    return (
        <div style={{
            display: showDialog ? "block" : "none",
            height: "100%"}}
        >
            <div style={{ height: "50%" }}>
                <h1 style={{ margin: 0 }}>モンスタ－闘技場</h1>
                <p style={{ marginTop: 0 }}>
                    参戦モンスター数を選択してください
                </p>
                <MonsterCountSelector
                    selectMonstersCountHandler={selectMonstersCountHandler}
                />
            </div>
            <SdivButtonFrame>
                <Button
                    id="battleStartBtn"
                    text={"次へ"}
                    width={150}
                    onClick={battleStartHandler}
                />

            </SdivButtonFrame>
        </div>
    );
}
export default BattleStartContents;