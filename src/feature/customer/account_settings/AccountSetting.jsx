import React from 'react'
import CustomerHeader from '../custome_header/CustomerHeader'
import Footer from '../footer/Footer'
import './styles/account-setting.css';
import SettingOption from './components/SettingOption';
import { FaRegAddressCard } from "react-icons/fa";
import { FiShield } from "react-icons/fi";
import { GoCreditCard } from "react-icons/go";
import { AiOutlineNotification } from "react-icons/ai";

export default function AccountSetting() {
    const title = "Personal ";
    const description = "Provide personal details and how we can reach you";

    const accountSettingList = [
        {
            iconComponent: <FaRegAddressCard fontSize={30} />,
            title: "Personal",
            description: "Provide personal details and how we can reach you"
        },
        {
            iconComponent: <FiShield fontSize={30} />,
            title: "Login & Sercurity",
            description: "Update your password and secure your account"
        },
        {
            iconComponent: <GoCreditCard fontSize={30} />,
            title: "Payments & payouts",
            description: "Review payments, payouts, coupons, and gift cards"
        },
        {
            iconComponent: <AiOutlineNotification fontSize={30} />,
            title: "Notifications",
            description: "Choose notification preferences and how you want to be contacted"
        },
    ]
    return (
        <div>
            <CustomerHeader />
            <div className='account-settings-container'>
                <div className="title">
                    <h1>Account</h1>
                    <div>
                        <p className='description'>Nhân Nguyễn, nhan.nguyenthanh0311@gmail.com</p>
                        <a href="">Go to profile</a>
                    </div>
                </div>
                <div className='grid-container'>
                    {accountSettingList?.map((ac,index) => (
                        <div key={index}> <SettingOption iconComponent={ac.iconComponent} title={ac.title} description={ac.description} /></div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

