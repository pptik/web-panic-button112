import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/LayoutComponent";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "@ansur/leaflet-pulse-icon";
import deviceMarker from "../../assets/marker-device.svg";
import emergencyMarker from "../../assets/marker112.svg";
import DeviceService from "../../services/service/DeviceService";
import AlertComponent from "../../components/AlertComponent";
import OPDService from "../../services/service/OPDService";
import MarkerClusterGroup from "react-leaflet-cluster";
import defaultMarker from "../../assets/marker.png";
import laporan from "../../assets/laporan.svg";
import CaseService from "../../services/service/CaseService";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import IPayloadRMQ from "../../helpers/interfaces/IPayloadRmq.rmq";
import { GetGuidCompany, GetRole } from "../../helpers/AuthHeaders";
import TransactionService from "../../services/service/TransactionService";

// Define custom icons
const deviceIcon = L.icon({
  iconUrl: deviceMarker,
  iconSize: [38, 38],
  iconAnchor: [18, 38],
  popupAnchor: [-3, -38],
});

const emergencyIcon = L.icon({
  iconUrl: emergencyMarker,
  iconSize: [38, 38],
  iconAnchor: [18, 38],
  popupAnchor: [-3, -38],
});

const defaultIcon = L.icon({
  html: `<div class="animate-blink></div>`,
  iconUrl: defaultMarker,
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [-3, -38],
});

// Create a pulsing icon for WebSocket data markers
const pulsingIcon = L.icon.pulse({
  iconSize: [20, 20],
  color: "red",
});

const DashboardPage = () => {
  const [devices, setDevices] = useState([]);
  const [opds, setOpds] = useState([]);
  const [cases, setCases] = useState([]);
  const [caseDatas, setCaseData] = useState([]);
  const navigate = useNavigate();
  const socketRef = useRef(null); // Ref for WebSocket connection
  const idCompany = GetGuidCompany();

  const getDeviceData = async () => {
    try {
      const response = await DeviceService.GetDevice();
      if (response.data.status) {
        setDevices(response.data.data);
      }
    } catch (error) {
      AlertComponent.Error("Error fetching devices");
    }
  };

  const getOpdsData = async () => {
    try {
      const response = await OPDService.GetOPD();
      if (response.data.status) {
        setOpds(response.data.data);
      }
    } catch (error) {
      AlertComponent.Error("Error fetching OPDs");
    }
  };

  const getCaseData = async () => {
    const role = GetRole();
    if (role === "admin") {
      let data = {
        page: 1,
        limit: 10,
        guidOpd: idCompany,
        isHandled: false,
        status: "Menunggu Respon OPD"
      };
      try {
        const response = await TransactionService.GetTransactionOpd(data);
        if (response.data.status) {
          setCases(response.data.data);
        }
      } catch (error) {
        AlertComponent.Error("Error fetching cases");
      }
    } else if (role === "super_admin") {
      try {
        const response = await CaseService.GetCase();
        if (response.data.status) {
          setCases(response.data.data);
        }
      } catch (error) {
        AlertComponent.Error("Error fetching cases");
      }
    }
  };

  const checkCase = () => {
    navigate("/incident");
  };

  const initializeWebSocket = () => {
    const role = GetRole();
    if (role === "super_admin") {
      socketRef.current = io("wss://api-panic-button112.lskk.co.id/");

      socketRef.current.on("connect", () => {});

      socketRef.current.on(`case-112#${idCompany}`, (data = IPayloadRMQ) => {
        // console.log(data);
        
        setCaseData((prevData) => [...prevData, data]); // Append new data
      });
    } else if (role === "admin") {
      socketRef.current = io("wss://api-panic-button112.lskk.co.id/");

      socketRef.current.on("connect", () => {});

      socketRef.current.on(`case-opd#${idCompany}`, (data = IPayloadRMQ) => {
        // console.log(data);
        
        setCaseData((prevData) => [...prevData, data]); // Append new data
      });
    }
  };

  useEffect(() => {
    getDeviceData();
    getOpdsData();
    getCaseData();

    initializeWebSocket();

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <h1 className="text-sm">Dashboard</h1>
        <h1 className="text-xl text-main font-bold tracking-wide">
          Informasi Geografis Data Umum
        </h1>
        <div className="bg-white p-3">
          <div>
            <MapContainer
              center={[-6.905977, 107.613144]}
              zoom={12}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerClusterGroup chunkedLoading>
                {devices?.map((device) => (
                  <Marker
                    key={device.id}
                    position={[device.latitude, device.longitude]}
                    icon={deviceIcon}
                  >
                    <Popup>{device.name}</Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
              <MarkerClusterGroup chunkedLoading>
                {opds?.map((opd) => (
                  <Marker
                    key={opd.id}
                    position={[opd.latitude, opd.longitude]}
                    icon={emergencyIcon}
                  >
                    <Popup>{opd.name}</Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
              {cases?.map((cas) => (
                <Marker
                  key={cas.id}
                  position={[cas.latitude, cas.longitude]}
                  icon={defaultIcon}
                >
                  <Popup>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-sm text-main font-bold tracking-wide">
                        Laporan Masuk
                      </h2>
                      <img
                        src={cas.imageUrl ? cas.imageUrl : laporan}
                        alt="laporan masuk 112"
                      />
                      <div className="flex flex-col gap-1">
                        <div>
                          <span className="font-semibold">Nama : </span>
                          {cas.sender}
                        </div>
                        <div>
                          <span className="font-semibold">Kondisi : </span>
                          {cas.description}
                        </div>
                        <div>
                          <span className="font-semibold">Lokasi : </span>
                          {cas.address}
                        </div>
                      </div>
                      <Button className="bg-main" onClick={checkCase}>
                        Lihat Laporan
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
              {caseDatas?.map((caseData) => (
                <Marker
                  key={caseData.id}
                  position={[caseData.latitude, caseData.longitude]}
                  icon={pulsingIcon}
                  className="animate-blink"
                >
                  <Popup>
                    <div className={`flex flex-col gap-2`}>
                      <h2 className="text-sm text-main font-bold tracking-wide">
                        Laporan Masuk
                      </h2>
                      <img
                        src={caseData.imageUrl ? caseData.imageUrl : laporan}
                        alt="laporan masuk 112"
                      />
                      <div className="flex flex-col gap-1">
                        <div>
                          <span className="font-semibold">Kondisi : </span>
                          {caseData.description}
                        </div>
                      </div>
                      <Button className="bg-main" onClick={checkCase}>
                        Lihat Laporan
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <div className="flex gap-5 mt-3">
            <div className="flex gap-2 justify-center items-center">
              <img src={emergencyMarker} alt="emergency 122" className="w-8" />
              <h3 className="text-xs whitespace-nowrap">
                Marker 112{" "}
                <span className="font-bold">(Layanan Panggilan Darurat)</span>
              </h3>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <img src={deviceMarker} alt="panic button" className="w-8" />
              <h3 className="text-xs whitespace-nowrap">
                Device Panic Button Terdaftar
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
