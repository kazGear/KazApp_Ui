import { ReactNode } from "react";
import { MonsterDTO } from "../../types/MonsterBattle";
import DialogFrame from "../common/DialogFrame";
import BattleStartContents from "./BattleStartContents";
import BetContents from "./BetContents";

interface ArgProps {
    monsters: MonsterDTO[];
    setBetMonster: React.Dispatch<React.SetStateAction<MonsterDTO | null>>;
    setBetGil: React.Dispatch<React.SetStateAction<number>>;
    showBetDialog: boolean;
    setShowBetDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogGameBet = ({
    monsters, setBetMonster, setBetGil, showBetDialog, setShowBetDialog
 }: ArgProps) => {

    const contents = (): ReactNode => {
        return <BetContents
                    monsters={monsters}
                    setBetMonster={setBetMonster}
                    setBetGil={setBetGil}
                    setShowDialog={setShowBetDialog} />
    }

    return (
        <DialogFrame
            renderChild={contents}
            showDialog={showBetDialog}
            showFilter={true} />
    );
}

export default DialogGameBet;