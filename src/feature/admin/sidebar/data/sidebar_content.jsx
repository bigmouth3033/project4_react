import { CgProfile } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import { PiCity } from "react-icons/pi";

const sidebar_content = [
  {
    name: "Dashboard",
    type: "button",
    icon: <CgProfile />,
    link: "/admin",
    role: [],
  },
  {
    name: "Managed City",
    type: "button",
    icon: <PiCity />,
    link: "/admin/managed_city",
    role: [],
  },
  {
    name: "Test Group",
    type: "group",
    icon: <PiCity />,
    role: [],
    children: [
      {
        name: "test1",
        icon: <FaPhoneAlt />,
        link: "/admin/test1",
      },
      {
        name: "test2",
        icon: <FaPhoneAlt />,
        link: "/admin/test2",
      },
    ],
  },
];

export default sidebar_content;
