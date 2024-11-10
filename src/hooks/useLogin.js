import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { IsEmpty } from "../lib/CommonLogic";

export const useLogin = () => {
    const loginLogic = useCallback((
        userNames,
        userName,
        password
    ) => {

        console.log(userNames);
        console.log(userName);
        console.log(password);





        if (IsEmpty(userNames)) {
            return false;
        } else {

            // LoginPageのエラーメッセージを表示させたい
            console.log(!userNames.includes(userName));
            if (!userNames.includes(userName)) return false;
        }

        return true;
    }, []);


    return loginLogic;
};