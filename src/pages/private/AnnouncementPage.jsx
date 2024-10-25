import React from "react";
import Layout from "../../components/LayoutComponent";

const AnnouncementPage = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <h1 className="text-sm">Dashboard / Pemberitahuan</h1>
        <h1 className="text-xl text-main font-bold tracking-wide">
          Pemberitahuan
        </h1>
      </div>
    </Layout>
  );
};

export default AnnouncementPage;
