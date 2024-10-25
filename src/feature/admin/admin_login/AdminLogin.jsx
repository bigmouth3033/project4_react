import styled from "styled-components";
import logo from "@/shared/assets/images/URBANNESTBLACK.png";
import TextInput from "@/shared/components/Input/TextInput";
import InputCheckBox from "@/shared/components/Input/InputCheckBox";
import Button1 from "@/shared/components/Button/Button1";
import { useEffect } from "react";
import WebFont from "webfontloader";
import background from "@/feature/admin/admin_login/assets/stacked-steps-haikei.svg";

const Container = styled.div`
  background-color: rgb(248, 249, 251);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${background});
`;

const CustomTextInput = styled(TextInput)`
  background-color: #e5efef;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  > div {
    width: 280px;
  }
`;

const LoginForm = styled.form`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 5px;

  width: 25rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const ButtonContaner = styled.div`
  display: flex;
  flex-direction: column;
`;

const RememberForgot = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  > span {
    cursor: pointer;
  }
`;

const Intro = styled.div`
  > p:nth-of-type(1) {
    font-size: 20px;
    font-weight: 600;
  }
  gap: 5px !important;

  > p:nth-of-type(2) {
    font-size: 15px;
    color: rgba(0, 0, 0, 0.3);
  }
  margin-bottom: 10px;
`;

const AdminLogin = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Nunito"],
      },
    });
  }, []);

  return (
    <Container>
      <LoginContainer>
        <div>
          <img src={logo} />
        </div>
        <LoginForm>
          <Intro>
            <p>Sign in to account</p> <p>Enter your email & password to login</p>
          </Intro>
          <div>
            <label>Email address</label>
            <CustomTextInput placeholder={"text@gmail.com"} />
          </div>
          <div>
            <label>Password</label>
            <CustomTextInput type={"password"} />
          </div>
          <RememberForgot>
            <div>
              <InputCheckBox /> Remember me
            </div>
            <span>Forgot password</span>
          </RememberForgot>
          <ButtonContaner>
            <Button1>Login</Button1>
          </ButtonContaner>
        </LoginForm>
      </LoginContainer>
    </Container>
  );
};

export default AdminLogin;
