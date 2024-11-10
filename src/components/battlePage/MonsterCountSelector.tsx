import styled from "styled-components";
import Select from "../common/Select";

const SselectMonsterCount = styled.select`
    padding: 5px;
    width: 150px;
    box-shadow: darkgreen 1px 1px;
`;

interface ArgProps {
    selectMonstersCountHandler: (e: any) => void;
}

const MonsterCountSelector = ({selectMonstersCountHandler}: ArgProps) => {
    return (
        <form method="POST" onChange={selectMonstersCountHandler}>
            <Select>
                <option value="2" selected disabled>
                    選択してください
                </option>
                <option value="2">２匹戦</option>
                <option value="3">３匹戦</option>
                <option value="4">４匹戦</option>
                <option value="5">５匹戦</option>
                <option value="6">６匹戦</option>
            </Select>
        </form>
    );
}

export default MonsterCountSelector;