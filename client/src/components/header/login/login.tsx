import { Button, Input, Form } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { loginFetch, signupFetch } from "../../../api";
import { IUser } from "../../../models/user.interfaces";
import { logIn } from "../../../redux/reducers/user";
import { ACCESS_TOKEN } from "../../../utils/constants/localStorage.constants";
import "./login.scss";

interface ILoginProps {
  closeLogin: () => void;
}

const Login = ({ closeLogin }: ILoginProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const auth = (data: IUser) => {
    if (isSignUp)
      signupFetch(data).then((res) => {
        if (res.error) return alert(res.error);

        dispatch(logIn(res.user));
        localStorage.setItem(ACCESS_TOKEN, res.token);

        closeLogin();
      });
    else
      loginFetch(data).then((res) => {
        if (res.error) return alert(res.error);

        dispatch(logIn(res.user));
        localStorage.setItem(ACCESS_TOKEN, res.token);

        closeLogin();
      });
  };

  return (
    <div className="login__wrapper" onClick={closeLogin}>
      <div className="login__container" onClick={stopPropagation}>
        <Form className="login__form" onFinish={auth}>
          <h1>{isSignUp ? t("common.signup") : t("common.login")}</h1>
          <p className="login__subtitle">
            {isSignUp ? t("signup.subtitle") : t("login.subtitle")}{" "}
            <span onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? t("common.login") : t("common.signup")}
            </span>
          </p>
          <div>
            {["username", "password"].map((item) => (
              <div className="login__input">
                <p>{t(`login.${item}`)}: </p>
                <Form.Item
                  name={item}
                  rules={[
                    { required: true, message: t(`login.${item}Validation`) },
                  ]}
                >
                  <Input placeholder={t(`login.${item}`)}></Input>
                </Form.Item>
              </div>
            ))}
          </div>
          <div className="login__btnBlock">
            <Button size="large" htmlType="submit">
              {isSignUp ? t("common.signup") : t("common.login")}
            </Button>
            <Button size="large" onClick={closeLogin}>
              {t("common.cancel")}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const stopPropagation = (event: any) => {
  event.stopPropagation();
};

export default Login;
