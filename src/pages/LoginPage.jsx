import { Link } from "react-router-dom";
import TitleHeader from "../components/common/AppHeader";
import styled from "styled-components";
import { COLORS, SESSION_STORAGE_KEYS } from "../lib/Constants";
import TestPageLinks from "../components/common/TestPageLinks";
import { useCallback, useState } from "react";

const LoginContainer = styled.div`
    text-align: center;
    display: flex;
    align-item: center;
`;

const LoginForm = styled.form`
    width: 200px;
    margin: auto;
    text-align: left;
`;

const Input = styled.input`
    width: 100%;
    border: ${COLORS.BORDER_COLOR} 1px solid;
`;

const Button = styled.button`
    width: 100%;
    border: ${COLORS.BORDER_COLOR} 1px solid;
`;

const SLink = styled(Link)`
    display: inline-block;
    color: ${COLORS.LINE_COLOR};
    margin: 20px 0 0 60px;
`;

const ErrorMessage = styled.p`
    margin: 10%;
    text-align: center;
    color: ${COLORS.ALERT_MESSAGE_COLOR};
`;

const LoginPage = () => {

    let [inputUserName, setInputUserName] = useState("");
    let [inputPassword, setInputPassword] = useState("");
    let [errorMessage, setErrorMessage] = useState("");

    // ユーザ名入力時
    const onChangeUserName = useCallback((event) => {
        setInputUserName(event.target.value);
    }, []);

    // パスワード入力時
    const onChangePassword = useCallback((event) => {
        setInputPassword(event.target.value);
    }, []);

    const requestOption = {
        method: "POST",
        mode: "cors",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "userName": inputUserName,
            "password": inputPassword
        })
    };

    // ログイン処理
    const exeLogin = useCallback(() => {
        fetch(`https://localhost:7234/api/Login/FetchLoginUsers`, requestOption)
            .then((data) => data.json())
            .then((userNames) => {
                if (userNames.length === 1) {
                    // ログイン成功
                    setErrorMessage("");
                    sessionStorage.setItem(SESSION_STORAGE_KEYS.userName, inputUserName);
                    window.location.replace("/testPages/MyPage");
                } else {
                    // ログイン失敗
                    setErrorMessage("ログインに失敗しました。");
                    setInputUserName("");
                    setInputPassword("");
                }
            });
    }, [requestOption, inputPassword]);

    return (
        <>
            <TitleHeader title="Login" />

            <div style={{ height: "100px" }}></div>

            <LoginContainer>
                <LoginForm action="" method="post">
                    <p style={{ margin: "20px 0" }}>ログイン</p>

                    <Input type="text"
                           name="username"
                           placeholder="Username"
                           onChange={onChangeUserName}
                           value={inputUserName}
                           />
                    <Input type="password"
                           name="password"
                           placeholder="Password"
                           onChange={onChangePassword}
                           value={inputPassword}
                           />
                    <br />
                    <Button type="button" onClick={exeLogin}>
                        <span>Go !</span>
                    </Button>
                </LoginForm>
            </LoginContainer>

            <ErrorMessage>{errorMessage}</ErrorMessage>

            <SLink to="/testPages/IndexPage" >戻る</SLink>
            <TestPageLinks />
        </>
    );
};

export default LoginPage;
