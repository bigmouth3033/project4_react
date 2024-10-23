import { Outlet } from "react-router-dom";
import styled, { css } from "styled-components";
import { useEffect } from "react";
import WebFont from "webfontloader";
import SideBar from "@/feature/admin/sidebar/SideBar";
import { useState } from "react";
import Header from "@/feature/admin/header/Header";

const Container = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;

  transition: all 0.1s;

  ${(props) => {
    if (props.$isSideBarSmall) {
      return css`
        grid-template-columns: 56px 1fr;
      `;
    }
  }}
`;

const AdminBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const OutletContainer = styled.div`
  background-color: #f7f6f6;
`;

export default function AdminLayout() {
  const [isSideBarSmall, setIsSideBarSmall] = useState(false);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Nunito"],
      },
    });
  }, []);

  return (
    <Container $isSideBarSmall={isSideBarSmall}>
      <SideBar isSideBarSmall={isSideBarSmall} />
      <AdminBody>
        <Header isSideBarSmall={isSideBarSmall} setIsSideBarSmall={setIsSideBarSmall} />
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </AdminBody>
    </Container>
  );
}
