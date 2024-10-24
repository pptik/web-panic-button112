import { useEffect, useState } from "react";
import Layout from "../../components/LayoutComponent";
import UserService from "../../services/service/UserService";
import logo from "../../assets/panic-button.svg";
import { Button } from "@mui/material";
import { RiEdit2Line } from "react-icons/ri";
import { GetRole } from "../../helpers/AuthHeaders";
import ChangePassword from "../../components/Modals/ChangePassword";
import ChangePhoto from "../../components/Modals/ChangePhoto";
import EditProfile from "../../components/Modals/EditProfile";

const ProfilePage = () => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isUbahPasswordOpen, setIsUbahPasswordOpen] = useState(false);
  const [isUbahFotoOpen, setIsUbahFotoOpen] = useState(false);
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const res = await UserService.getProfile();
      if (res.data.success) {
        setProfiles(res.data.data.user);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const localDate = () => {
    const date = new Date(profiles.createdAt).toLocaleDateString();
    return date;
  };

  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <h1 className="text-sm">Dashboard / Profile</h1>
        <h1 className="text-xl text-main font-bold tracking-wide">Profile</h1>
        <div className="flex gap-5">
          <div className="bg-white p-3 w-1/3 flex flex-col justify-center items-center gap-3">
            <div className="h-36 w-36 border-2 border-black rounded-full ">
              <img
                className={`${profiles?.imageProfile} ? h-full w-full object-contain rounded-full : p-5`}
                src={profiles?.imageProfile || logo}
                alt="Profile"
              />
            </div>
            <h2 className="text-lg font-bold">
              {profiles?.name || "Pengguna"}
            </h2>
            <h3 className="text-sm text-main">
              {profiles?.email || "Pengguna@gmail.com"}
            </h3>
            <Button
              variant="contained"
              className="w-full"
              onClick={() => setIsUbahFotoOpen(true)}
            >
              Ubah Avatar
            </Button>
            <Button
              variant="outlined"
              className="w-full"
              onClick={() => setIsUbahPasswordOpen(true)}
            >
              Ubah Password
            </Button>
          </div>
          <div className="bg-white p-3 w-2/3">
            <h2 className="text-main font-bold mb-3">Informasi Pribadi</h2>
            <hr />
            <div className="flex flex-col gap-2 text-sm my-5 font-semibold">
              <div>
                Nama :{" "}
                <span className="font-normal">
                  {profiles?.name || "Pengguna"}
                </span>
              </div>
              <div>
                Email :{" "}
                <span className="font-normal">
                  {profiles?.email || "Pengguna@gmail.com"}
                </span>
              </div>
              <div>
                No. Telp :{" "}
                <span className="font-normal">
                  {profiles?.phoneNumber || "08126718.."}
                </span>
              </div>
              <div>
                Alamat :{" "}
                <span className="font-normal">
                  {profiles?.address || "Edit profile untu menambahkan alamat"}
                </span>
              </div>
              <div>
                Tanggal Bergabung :{" "}
                <span className="font-normal">{localDate()}</span>
              </div>
              <div>
                Role : <span className="font-normal">{GetRole()}</span>
              </div>
            </div>
            <hr />
            <div className="flex justify-end">
              <Button
                className="flex gap-2 text-right"
                onClick={() => setIsEditProfileOpen(true)}
              >
                <RiEdit2Line /> <p>Edit Data User</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isUbahPasswordOpen && (
        <ChangePassword
          isOpen={isUbahPasswordOpen}
          onClose={() => setIsUbahPasswordOpen(false)}
          data={profiles.email}
        />
      )}
      {isEditProfileOpen && (
        <EditProfile
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          data={profiles}
        />
      )}
      <ChangePhoto
        isOpen={isUbahFotoOpen}
        onClose={() => setIsUbahFotoOpen(false)}
      />
    </Layout>
  );
};

export default ProfilePage;
