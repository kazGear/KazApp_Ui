import { Link } from "react-router-dom";

const TestPageLinks = () => {
    return (
        <div style={{marginTop: "20px"}}>
            <Link to={"/IndexPage"}>IndexPage</Link><br/>
            <Link to={"/LoginPage"}>LoginPage</Link><br/>
            <Link to={"/MyCartPage"}>MyCartPage</Link><br/>
            <Link to={"/MyPage"}>MyPage</Link><br/>
            <Link to={"/ShopPage"}>ShopPage</Link><br/>
            <Link to={"/BattlePage"}>BattlePage</Link><br/>
        </div>
    );
};

export default TestPageLinks;
