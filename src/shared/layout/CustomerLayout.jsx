import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import WebFont from "webfontloader";

const Container = styled.div``;

const OutletContainer = styled.div``;

export default function CustomerLayout() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Nunito"],
      },
    });
  }, []);

  return (
    <Container>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </Container>
  );
}
