import {useEffect} from "react";

export const LoginPage = ({loginHandler}) => {

    useEffect(() => {
        loginHandler();
    }, []);

    return <></>;
}
