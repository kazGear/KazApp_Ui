import styled from "styled-components";
import Button from "../common/Button";
import React, { useState } from "react";
import MonsterSelector from "./MonsterSelector";
import { MonsterDTO } from "../../types/MonsterBattle";

const SdivInputFrame = styled.div`
    display: flex;
    justify-content: space-between;
`;

interface ArgProps {
    monsters: MonsterDTO[];
    setBetMonster: React.Dispatch<React.SetStateAction<MonsterDTO | null>>;
    setBetGil: React.Dispatch<React.SetStateAction<number>>;
    showDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const BetContents = (
    {monsters, setBetMonster, setBetGil, showDialog}: ArgProps
) => {
    // 選択したモンスターに賭ける
    const rowClickHandler = (row: any) => {
        setBetMonster(row);
    }

    // 掛け金検証
    const [betError, setBetError] = useState(false);
    const validBet = (e: any) => {
        if (e.target.value < 0 || e.target.value > 999999) {
            setBetError(true);
        } else if (!String(e.target.value).match(/^[1-9]\d*$/g)) {
            setBetError(true);
        } else {
            setBetError(false);
        }
    }
    // 賭けモンスター検証
    const [selectError, setSelectError] = useState(true);
    const validSelect = (e: any) => {
        if (e.target.value !== 0) {
             setSelectError(false);
        } else {
            setSelectError(true);
        }
    }

    return (
        <>
            <h1 style={{margin: "0 0 5px 0"}}>どのモンスターに賭けますか？</h1>

            <MonsterSelector
                monsters={monsters}
                rowClickHandler={rowClickHandler}
                validSelect={validSelect}
                selectError={selectError}
            />

            <p style={{margin: "10px 0 0 0"}}>賭け金を入力してください</p>

            <SdivInputFrame>
                <input
                    type="text"
                    style={{width: "100px"}}
                    defaultValue={0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        validBet(e);
                        setBetGil(parseInt(e.target.value));
                    }}/ >
                <Button
                    text={"スタート"}
                    width={120}
                    onClick={() => showDialog(false)}
                    disabled={ betError || selectError} />
            </SdivInputFrame>

            {
                betError ? <span style={{color: "red"}}>※掛け金は0～999,999の範囲にしてください。</span> : ""
            }
        </>
    );
}

export default BetContents;