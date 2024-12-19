import React, { useEffect, useState } from 'react'
import CustomerHeader from '../../custome_header/CustomerHeader'
import Footer from '../../footer/Footer'
import styled from 'styled-components'
import TitleHeader from './common/TitleHeader'
import PersonalSettingOption from './common/PersonalSettingOption'
import LegalNameOption from './LegalNameOption'
import { UserRequest } from '@/shared/api/userApi'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import WaitingPopUp from '@/shared/components/PopUp/WaitingPopUp'

import PreferredNameOption from './PreferredNameOption'
import PhoneNumberOption from './PhoneNumberOption'
import axios from 'axios'
import AddressOption from './AddressOption'


const Container = styled.div`
   width: 1080px;
  min-height: 500px;
  margin: auto;  
`
const FlexBoxContainer = styled.div`
    display: flex;
`
const FlexBoxLeft = styled.div`
    margin-top: 3%;
    flex: 2;
`
const FlexBoxRight = styled.div`
    flex: 1;
`
const PersonalSettingContainer = styled.div`

`
export default function PersonalInfo() {
    const [personalSettingOptionList, SetPersonalSettingOptionList] = useState([]);
    const user = UserRequest();
    const navigate = useNavigate();


   
    useEffect(() => {        
        console.log(user.data)
    }, [user.isSuccess])

   
    if (user.isLoading) {
        return <WaitingPopUp />;
    }

    if (user.isError) {
        Cookies.remove("CLIENT_ACCESS_TOKEN");
        navigate("/");
    }

    if (user.isSuccess && user.data.status == 404) {
        navigate("/");
        return;
    }

    if (user.isSuccess && user.data.status == 200 && user.data.data.status == false) {
        Cookies.remove("CLIENT_ACCESS_TOKEN");
        user.refetch();
    }

    const updatePersonalSettingOptionList = (id, title, description, actionName) => {
        SetPersonalSettingOptionList(preOptions => {
            return preOptions.map(option => {
                if (option.id === id) {
                    return { ...option, title, description, actionName, isDisabled: false };
                }
                return { ...option, isDisabled: true };
            })
        })
    }
    return (
        <div>
            <CustomerHeader />
            <Container>
                <TitleHeader name="Personal Info" />
                <FlexBoxContainer>
                    <FlexBoxLeft>
                        <LegalNameOption firstName={user?.data?.data?.firstName} lastName={user?.data?.data?.lastName} />
                        <PreferredNameOption preferredName={user?.data?.data?.preferredName}/>
                        <PhoneNumberOption phoneNumber={user?.data?.data?.phoneNumber}/>
                        <AddressOption addressProp={user?.data?.data?.address}/>
                    </FlexBoxLeft>
                    <FlexBoxRight>
                    </FlexBoxRight>
                </FlexBoxContainer>
            </Container>
            <Footer />
        </div>
    )
}
