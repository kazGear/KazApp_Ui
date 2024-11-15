import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuTitle from "../components/common/MenuTitle";
import TestPageLinks from "../components/common/TestPageLinks";

const Slink = styled(Link)`
    text-decoration: none;
    color: gray;
`;
const SdivLinkFrame = styled.div`
    width: 80%;
    margin: 40px auto;
`;
const SpDescription = styled.p`
    margin: 0 0 0 40px;
`;

const IndexPage = () => {

    return (
        <>
            <SdivLinkFrame>
                <Slink to={"/"}>
                    <MenuTitle title={"ユーザー（ 工事中 ）"} styleObj={{color: "gray"}}/>
                </Slink>
                <SpDescription>
                    制作中・・・ ユーザ登録、ログイン、検索 ...
                </SpDescription>

                <Slink to={"/battlePage"}>
                    <MenuTitle title={"モンスタ－闘技場"} />
                </Slink>
                <SpDescription>
                    某RPGカジノ風のモンスター闘技場です。<br/>
                    どのモンスターが勝ち残るか当ててみてください。<br/>
                    ※バッチ処理でも毎晩強制的に戦わされています。
                </SpDescription>

                <Slink to={"/battleResultPage"}>
                    <MenuTitle title={"闘技場戦績"} />
                </Slink>
                <SpDescription>
                    モンスター達がこれまで戦ってきた戦績を残してありますので<br/>
                    その戦績レポートを閲覧できます。
                </SpDescription>

                <Slink to={"/"} >
                    <MenuTitle title={"ショップ（ 工事中 ）"} styleObj={{color: "gray"}}/>
                </Slink>
                <SpDescription>
                    制作予定・・・ モンスターセット、スキルセットの開放、アイテム ...
                </SpDescription>
            </SdivLinkFrame>

            {/* <TestPageLinks /> */}
        </>
    );
};

export default IndexPage;
