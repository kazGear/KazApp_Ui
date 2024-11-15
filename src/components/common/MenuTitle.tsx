import styled from "styled-components";

const SmenuTitle = styled.h2`
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-radius: 10px;
    border-collapse: collapse;
`;

interface ArgProps {
    title: string
    styleObj?: React.CSSProperties;
}

const MenuTitle = ({title, styleObj}: ArgProps) => {
    return <SmenuTitle className="ripple"
                       style={styleObj}>
                {title}
            </SmenuTitle>;
};

export default MenuTitle;
