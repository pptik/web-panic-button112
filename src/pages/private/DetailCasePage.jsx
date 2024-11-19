import React, { useEffect, useState } from "react";
import Layout from "../../components/LayoutComponent";
import { useParams } from "react-router-dom";
import CaseService from "../../services/service/CaseService";
import ResponseService from "../../services/service/ResponseService";
import AlertComponent from "../../components/AlertComponent";

export const DetailCasePage = () => {
  const { guid } = useParams();

  const [caseDetail, setCaseDetail] = useState(null);
  const [rpts, setRpts] = useState([]);
  const [loading, setLoading] = useState(true); // Menambahkan state untuk loading

  const getCaseDetail = async () => {
    try {
      const response = await CaseService.GetCaseByGuid(guid);
      if (response.data.status) {
        setCaseDetail(response.data.data);
      } else {
        AlertComponent.Error(
          response.data.message || "Failed to fetch case details"
        );
      }
    } catch (error) {
      console.error("Error fetching case detail:", error);
      AlertComponent.Error("Error fetching case details");
    } finally {
      setLoading(false);
    }
  };

  const getResponseTime = async () => {
    try {
      const response = await ResponseService.getResponseTime(guid);
      if (response.data.status) {
        setRpts(response.data.data);
      } else {
        AlertComponent.Error(
          response.data.message || "Failed to fetch response time data"
        );
      }
    } catch (error) {
      console.error("Error fetching response time:", error);
      AlertComponent.Error("Error fetching response time");
    }
  };

  useEffect(() => {
    if (guid) {
      getCaseDetail();
      getResponseTime();
    }
  }, [guid]);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p>Loading case details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <h1 className="text-sm">Dashboard / Case / Detail Case</h1>
        <h1 className="text-xl text-main font-bold tracking-wide">
          Detail Case
        </h1>
        <div className="bg-white p-3">
          {caseDetail ? (
            <div className="flex gap-3">
              <div className="max-w-[400px]">
                <img src={caseDetail.imageUrl} alt="Case Image" />
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <h2 className="font-bold">Nama Pengirim</h2>
                  <p>{caseDetail.sender}</p>
                </div>
                <div>
                  <h2 className="font-bold">Longitude</h2>
                  <p>{caseDetail.longitude}</p>
                </div>
                <div>
                  <h2 className="font-bold">Alamat</h2>
                  <p>{caseDetail.address}</p>
                </div>
                <div>
                  <h2 className="font-bold">Deskripsi</h2>
                  <p>{caseDetail.description}</p>
                </div>
                <div>
                  <h2 className="font-bold">Device</h2>
                  <p>{caseDetail.deviceType}</p>
                </div>
                <div>
                  <h2 className="font-bold">Status</h2>
                  <p>{caseDetail.status}</p>
                </div>
              </div>
              <div className="ml-10 flex flex-col gap-3">
                <div>
                  <h2 className="font-bold">Waktu Laporan</h2>
                  <p>{formatDate(caseDetail.createdAt)}</p>
                </div>
                <div>
                  <h2 className="font-bold">Latitude</h2>
                  <p>{caseDetail.latitude}</p>
                </div>
              </div>
            </div>
          ) : (
            <p>No case details available.</p>
          )}

          {/* {rpts.length > 0 ? (
            <ul className="mt-4">
              <h2 className="font-bold">Response Times:</h2>
              {rpts.map((rpt, index) => (
                <li key={index}>{rpt}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-4">No response time data available.</p>
          )} */}
        </div>
      </div>
    </Layout>
  );
};
