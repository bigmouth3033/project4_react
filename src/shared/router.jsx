import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
import HomePage from "@/feature/customer/homepage/HomePage";
import DashBoard from "@/feature/admin/dashboard/DashBoard";
import AdminLayout from "./layout/AdminLayout";
import AdminLogin from "@/feature/admin/admin_login/AdminLogin";
import HostLayout from "./layout/HostLayout";
import Hosting from "@/feature/customer/hosting/Hosting";
import ManagedCity from "@/feature/admin/managed_city/ManagedCity";
import Amenity from "@/feature/admin/amenity/Amenity";
import CreateAmenity from "@/feature/admin/create_amenity/CreateAmenity";
import EditAmenity from "@/feature/admin/edit_amenity/EditAmenity";
import CreateCategory from "@/feature/admin/create_category/CreateCategory";
import Category from "@/feature/admin/category/Category";
import UpdateCategory from "@/feature/admin/update_category/UpdateCategory";
import CreateListing from "@/feature/customer/create_listing/CreateListing";
import CreateListingInitial from "@/feature/customer/create_listing/components/CreateListingInitial";
import ListingDetailIntro from "@/feature/customer/create_listing/components/ListingDetailIntro";
import CategoryListing from "@/feature/customer/create_listing/components/CategoryListing";
import LocationListing from "@/feature/customer/create_listing/components/LocationListing";
import AmenityListing from "@/feature/customer/create_listing/components/AmenityListing";
import BasicListing from "@/feature/customer/create_listing/components/BasicListing";
import PhotoListing from "@/feature/customer/create_listing/components/PhotoListing";
import DetailListing from "@/feature/customer/create_listing/components/DetailListing";
import PricingListing from "@/feature/customer/create_listing/components/PricingListing";
import PolicyListing from "@/feature/customer/create_listing/components/PolicyListing";
import PropertyDetail from "@/feature/customer/property_detail/PropertyDetail";
import HostListing from "@/feature/customer/host_listing/HostListing";
import HostCalendar from "@/feature/customer/host_calendar/HostCalendar";
import AccountSetting from "@/feature/customer/account_settings/AccountSetting";
import PersonalInfo from "@/feature/customer/account_settings/components/PersonalInfo";
import GovernmentID from "@/feature/customer/account_settings/components/GovernmentID";
import LoginAndSecurity from "@/feature/customer/account_settings/pages/LoginAndSecurity";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <UserLayout />,
      children: [
        { path: "account-settings", element: <AccountSetting /> },
        { path: "account-settings/login-and-sercurity", element: <LoginAndSecurity /> },
        { path: "account-settings/personal-info", element: <PersonalInfo /> },
        { path: "account-settings/personal-info/govermentSetting", element: <GovernmentID /> },
        { path: "", element: <HomePage /> },
        { path: "/property_detail", element: <PropertyDetail /> },
        {
          path: "/hosting",
          element: <HostLayout />,
          children: [
            { path: "", element: <Hosting /> },
            { path: "listing", element: <HostListing /> },
            { path: "calendar", element: <HostCalendar /> },
          ],
        },
        {
          path: "become_a_host",
          element: <CreateListing />,
          children: [
            {
              path: "",
              element: <CreateListingInitial />,
            },
            {
              path: ":listing_id",
              element: <ListingDetailIntro />,
            },
            {
              path: ":listing_id/category",
              element: <CategoryListing />,
            },
            {
              path: ":listing_id/location",
              element: <LocationListing />,
            },
            {
              path: ":listing_id/amenity",
              element: <AmenityListing />,
            },
            {
              path: ":listing_id/basic",
              element: <BasicListing />,
            },
            {
              path: ":listing_id/photo",
              element: <PhotoListing />,
            },
            {
              path: ":listing_id/detail",
              element: <DetailListing />,
            },
            {
              path: ":listing_id/pricing",
              element: <PricingListing />,
            },
            {
              path: ":listing_id/policy",
              element: <PolicyListing />,
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: <DashBoard />,
        },
        {
          path: "managed_city",
          element: <ManagedCity />,
        },
        {
          path: "amenity_list",
          element: <Amenity />,
        },
        {
          path: "new_amenity",
          element: <CreateAmenity />,
        },
        {
          path: "edit_amenity",
          element: <EditAmenity />,
        },
        {
          path: "new_category",
          element: <CreateCategory />,
        },
        {
          path: "category_list",
          element: <Category />,
        },
        {
          path: "edit_category",
          element: <UpdateCategory />,
        },
      ],
    },
    {
      path: "/admin_login",
      element: <AdminLogin />,
    },
  ],
  { basename: "/UrbanNest" }
);

export default router;
