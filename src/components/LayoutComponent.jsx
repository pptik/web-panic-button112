import Sidebar from "../components/SidebarComponent";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex w-full lg:w-[100%] flex-1 h-screen overflow-y-auto overflow-x-hidden p-3 bg-[#F2F6FA]">
        <main className="px-2 md:px-0 w-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
