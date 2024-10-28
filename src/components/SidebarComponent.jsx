import { useEffect, useState } from "react";
import {
  Button,
  Card,
  List,
  ListItem,
  Dialog,
  DialogBody,
  DialogFooter,
  ListItemPrefix,
} from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { RiDashboardFill, RiGroupLine, RiHistoryFill } from "react-icons/ri";
import { HiMenu } from "react-icons/hi";
import logo from "../assets/panic-button.svg";
import User from "../localStorages/User";
import notify from "../assets/notify.svg";
import { TbDeviceAirpodsCase, TbDeviceWatch } from "react-icons/tb";
import { FaFireAlt, FaRegUser } from "react-icons/fa";
import { GetRole } from "../helpers/AuthHeaders";

const Sidebar = () => {
  const navigate = useNavigate();
  const [min, setMin] = useState(true);
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState(""); // State untuk menyimpan role pengguna

  useEffect(() => {
    const userRole = GetRole(); // Ambil role pengguna dari fungsi GetRole atau konteks autentikasi
    setRole(userRole);
  }, []);

  const itemSidebar = [
    {
      name: "Dashboard",
      icon: RiDashboardFill,
      path: "/dashboard",
    },
    {
      name: "Kasus Kejadian",
      icon: RiHistoryFill,
      path: "/incident",
    },
    {
      name: "Riwayat Kejadian",
      icon: TbDeviceAirpodsCase,
      path: "/case",
    },
    {
      name: "Perangkat",
      icon: TbDeviceWatch,
      path: "/device",
    },
    {
      name: "Manajemen Pengguna",
      icon: RiGroupLine,
      path: "/user-management",
    },
    {
      name: "Daftar OPD",
      icon: FaFireAlt,
      path: "/opd-list",
    },
    {
      name: "Profile",
      icon: FaRegUser,
      path: "/profile",
    },
  ];

  const adminSidebar = [
    {
      name: "Dashboard",
      icon: RiDashboardFill,
      path: "/dashboard",
    },
    {
      name: "Kasus Kejadian",
      icon: RiHistoryFill,
      path: "/incident",
    },
    {
      name: "Perangkat",
      icon: TbDeviceWatch,
      path: "/device",
    },
    {
      name: "Profile",
      icon: FaRegUser,
      path: "/profile",
    },
  ];

  const sidebarItems = role === "super_admin" ? itemSidebar : adminSidebar;

  const handleMin = () => setMin(!min);
  const handleOpen = () => setOpen(!open);
  const handleLogout = () => {
    User.Logout();
    setInterval(() => {
      window.location.reload();
    }, 2000);
    navigate("/");
  };
  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <div className="lg:hidden p-3">
        <HiMenu
          className="cursor-pointer"
          size={30}
          onClick={handleSidebarToggle}
        />
      </div>

      <Card
        className={`${min ? "w-64" : "w-20"} ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform fixed lg:static rounded-none top-0 left-0 h-full z-50 p-3 flex flex-col justify-between border shadow-xl shadow-blue-gray-900/5`}
      >
        <div className="overflow-y-auto overflow-x-hidden flex-1">
          <div className="flex gap-3 items-center">
            <img
              src={logo}
              alt="logo"
              className="w-12 cursor-pointer"
              onClick={handleMin}
            />
            <div>
              <h1
                className={`${
                  min ? "text-xl text-main font-bold tracking-widest" : "hidden"
                }`}
              >
                Panic Button
              </h1>
              <h2
                className={`${
                  min ? "text-sm text-blue tracking-widest" : "hidden"
                }`}
              ></h2>
            </div>
          </div>
          <hr className="border-main mt-2" />
          <List className="my-5">
            {sidebarItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={`${min ? "w-full" : "w-10"}`}
              >
                <ListItem className="text-main hover:bg-main hover:text-white active:text-white focus:text-white active:bg-main focus:bg-main">
                  <ListItemPrefix>
                    <item.icon />
                  </ListItemPrefix>
                  <span className={`${min ? "font-bold text-sm " : "hidden"}`}>
                    {item.name}
                  </span>
                </ListItem>
              </NavLink>
            ))}
            <NavLink
              className={`${min ? " w-full" : "w-10"}`}
              onClick={handleOpen}
            >
              <ListItem className="text-main hover:bg-main hover:text-white active:text-white focus:text-white active:bg-main focus:bg-main">
                <ListItemPrefix>
                  <IoMdLogOut />
                </ListItemPrefix>
                <span className={`${min ? "font-bold text-sm" : "hidden"}`}>
                  Logout
                </span>
              </ListItem>
            </NavLink>
          </List>
        </div>
      </Card>
      <Dialog
        open={open}
        handler={handleOpen}
        size="xs"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogBody className="relative flex flex-col justify-center items-center gap-2">
          <div className="absolute top-10 left-10 bg-yellow-500 blur-3xl p-9 rounded-full"></div>
          <h1 className="text-xl lg:text-2xl font-bold text-main">
            Peringatan!
          </h1>
          <img src={notify} alt="notify" className="w-1/2" />
          <p className="font-bold text-main text-lg">
            Apakah yakin ingin keluar?
          </p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Batal</span>
          </Button>
          <Button onClick={handleLogout} className="bg-main">
            Oke
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Sidebar;
