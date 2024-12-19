import React from 'react'
import styled from 'styled-components'
import TitleHeader from '../components/common/TitleHeader'
import CustomerHeader from '../../custome_header/CustomerHeader'
import Footer from '../../footer/Footer'
import Login from './login_and_security_component/Login'


const Container = styled.div`
  width: 1080px;
  min-height: 500px;
  margin: auto;  
  display: flex;
`

const Left = styled.div`
flex: 2;
`
const Right = styled.div`
flex: 1;
`
export default function LoginAndSecurity() {
  return (
    <div>
      <CustomerHeader />
      <Container>
        <Left>
          <TitleHeader name="Login & security" />
          <Login />
        </Left>
        <Right>

        </Right>
      </Container>
      <Footer />
    </div>
  )
}
