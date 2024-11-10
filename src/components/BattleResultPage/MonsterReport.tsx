import styled from "styled-components";
import { MonsterReportDTO } from "../../types/BattleReport";
import { COLORS } from "../../lib/Constants";
import monsterImages from "../../lib/MonsterImages";

const Stable = styled.table`
    margin: 0 auto;
    border-collapse: collapse;
`;
const StrHeaderRow = styled.tr`
    color: ${COLORS.CAPTION_FONT_COLOR};
    position: fixed;
    background-color: white;
    font-weight: bold;
`;
const Std1 = styled.td`
    width: 140px;
    height: 35px;
    border-top: ${COLORS.BORDER_COLOR} 1px solid;
    border-bottom: ${COLORS.BORDER_COLOR} 1px solid;
    padding-left: 20px;
    `;
const Std2 = styled.td`
    border-top: ${COLORS.BORDER_COLOR} 1px solid;
    border-bottom: ${COLORS.BORDER_COLOR} 1px solid;
    width: 50px;
`;
const Std3 = styled.td`
    width: 60px;
    border-top: ${COLORS.BORDER_COLOR} 1px solid;
    border-bottom: ${COLORS.BORDER_COLOR} 1px solid;
`;
const Std4 = styled.td`
    width: 60px;
    border-top: ${COLORS.BORDER_COLOR} 1px solid;
    border-bottom: ${COLORS.BORDER_COLOR} 1px solid;
`;
const Std5 = styled.td`
    width: 60px;
    border-top: ${COLORS.BORDER_COLOR} 1px solid;
    border-bottom: ${COLORS.BORDER_COLOR} 1px solid;
`;
const Simg = styled.img`
    width: 30px;
    height: 30px;
    vertical-align: middle;
`;
interface ArgProps {
    monsterReport: MonsterReportDTO[];
}

const MonsterReport = ({monsterReport}: ArgProps) => {
    return (
        <Stable>
            { monsterReport.length > 0 ?
                <thead>
                    <StrHeaderRow>
                        <Std1>モンスター名</Std1>
                        <Std2></Std2>
                        <Std3>勝利数</Std3>
                        <Std4>対戦数</Std4>
                        <Std5>勝率</Std5>
                    </StrHeaderRow>
                </thead>
                : ""
            }
            <tbody>
            {
                monsterReport.map((report) => {
                    return (
                        <tr key={report.MonsterId}>
                            <Std1>{report.MonsterName}</Std1>
                            <Std2>
                                <Simg src={monsterImages(report.MonsterId)} alt=""/>
                            </Std2>
                            <Std3>{report.Wins} 勝</Std3>
                            <Std4>{report.BattleCount} 戦</Std4>
                            <Std5>{report.WinRate}</Std5>
                        </tr>
                    )
                })

            }
            </tbody>
        </Stable>
    );
}

export default MonsterReport;