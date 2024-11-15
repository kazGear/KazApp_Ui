import { ChangeEvent, useEffect, useState } from "react";
import { useServerWithQuery } from "../../hooks/common/useServerWithQuery";
import Select from "../common/Select";
import { URL } from "../../lib/Constants";
import { MonsterTypeDTO } from "../../types/BattleReport";
import styled from "styled-components";

const SdivListFrame = styled.div`
    margin: 10px;
`;

interface ArgProps {
    setMonsterTypeId: React.Dispatch<React.SetStateAction<string>>;
}

const MonsterTypesList = ({setMonsterTypeId}: ArgProps) => {
    const [monsterTypes, setMonsterTypes] = useState<MonsterTypeDTO[]>([]);
    const fetchMonsterTypes = useServerWithQuery();

    useEffect(() => {
        const fetchTypes = async () => {
            const types: MonsterTypeDTO[] = await fetchMonsterTypes(URL.INIT_BATTLE_REPORT);
            setMonsterTypes(types);
        }
        fetchTypes();
    }, []);

    const changeMonsterTypeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setMonsterTypeId(e.target.value);
    }

    return (
        <SdivListFrame>
            <label>モンスター種</label>
            <Select onChange={changeMonsterTypeHandler}>
                <option value="0">指定なし</option>
                {
                    monsterTypes.map((monster, index) => {
                        return (
                            <option value={monster.MonsterTypeId} key={index}>
                                {monster.MonsterTypeName}
                            </option>
                    )})
                }
            </Select>
        </SdivListFrame>
    );
}

export default MonsterTypesList;