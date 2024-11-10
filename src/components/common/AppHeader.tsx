import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Sheader = styled.header`
    height: 50px;
    box-shadow: 0px 0px 10px 0px #000000;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between
`;

const SdivButtonFrame = styled.div`
    display: flex;
    margin-right: auto;
    margin-left: 20px;
`;


interface ArgProps { title: string; }

const AppHeader = ({title}: ArgProps) => {
    const navigate = useNavigate();
    const currentUrl: string = window.location.href;
    const isRootPage: boolean = currentUrl.endsWith("/");

    return (
        <Sheader>
            <h1 style={{marginLeft: "20px"}}>{title}</h1>
            <SdivButtonFrame style={{display: isRootPage ? "none" : ""}}>
                <Button text="モンスター闘技場"
                        width={125}
                        onClick={() => navigate("/battlePage")}/>
                <Button text="闘技場戦績"
                        width={90}
                        onClick={() => navigate("/battleResultPage")}/>
                <Button text="工事中"
                        width={60}
                        onClick={() => {}}/>
                <Button text="工事中"
                        width={60}
                        onClick={() => {}}/>
            </SdivButtonFrame>
            <Button text="メニューへ"
                    onClick={() => navigate("/")}
                    styleObj={{
                        marginRight: "20px",
                        position: "relative",
                        zIndex: 5000
                    }}
            />
        </Sheader>
    );
};

export default AppHeader;
