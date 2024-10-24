import React from "react";
import Layout from "../../components/LayoutComponent";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import deviceMarker from "../../assets/marker-device.svg";
import emergencyMarker from "../../assets/marker112.svg";

// Define custom icons
const deviceIcon = L.icon({
  iconUrl: deviceMarker,
  iconSize: [38, 38], // Set size of the icon
  iconAnchor: [22, 94], // Point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // Point from which the popup should open relative to the iconAnchor
});

const emergencyIcon = L.icon({
  iconUrl: emergencyMarker,
  iconSize: [38, 38],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

const DashboardPage = () => {
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
              center={[-6.90389, 107.61861]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[-6.90389, 107.61861]} icon={deviceIcon}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
              <Marker position={[-6.90389, 107.63961]} icon={emergencyIcon}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
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
