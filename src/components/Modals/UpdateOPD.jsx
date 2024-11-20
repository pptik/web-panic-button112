import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { Icon } from "leaflet";
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import marker from "../../assets/marker.png";
import AlertComponent from "../AlertComponent";
import OPDService from "../../services/service/OPDService";

// LocationMarker component
function LocationMarker({ center, onClick }) {
  const [position, setPosition] = useState(center);

  useMapEvents({
    click(e) {
      const { latlng } = e;
      onClick(latlng);
      setPosition(latlng);
    },
  });

  useEffect(() => {
    if (center) {
      setPosition(center);
    }
  }, [center]);

  return position ? (
    <Marker
      position={position}
      icon={
        new Icon({
          iconUrl: marker,
          iconSize: [34, 38],
          iconAnchor: [17, 38],
        })
      }
    />
  ) : null;
}

function SetMapCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lng]);
  }, [center, map]);
  return null;
}

export const UpdateOPD = ({ isOpen, onClose, data, initialCenter }) => {
  const [center, setCenter] = useState(initialCenter);
  const [latitude, setLatitude] = useState(initialCenter.lat);
  const [longitude, setLongitude] = useState(initialCenter.lng);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [guid, setGuid] = useState("");
  const [email, setEmail] = useState("");

  const handleMapClick = (latlng) => {
    setLatitude(latlng.lat);
    setLongitude(latlng.lng);
    setCenter(latlng); // Update center when clicked
  };

  useEffect(() => {
    if (initialCenter.lat && initialCenter.lng) {
      setCenter(initialCenter);
      setLatitude(initialCenter.lat);
      setLongitude(initialCenter.lng);
    }
  }, [initialCenter]);

  useEffect(() => {
    if (data) {
      setCenter({ lat: data.latitude, lng: data.longitude });
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      setName(data.name || "");
      setAddress(data.address || "");
      setGuid(data.id || "");
      setEmail(data.email || "");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setLatitude(latitude);
          setLongitude(longitude);
        },
        () => console.log("Geolocation not available")
      );
    }
  }, [data]);

  if (!center.lat || !center.lng) return null; // Avoid rendering until center is valid

  const handleSave = async () => {
    setIsLoading(true);
    let data = {
      name,
      address,
      email,
      longitude,
      latitude
    };
    try {
      const response = await OPDService.UpdateOPD(guid, data);
      setIsLoading(false);
      onClose();
      AlertComponent.SuccessResponse("Berhasil Memperbaharui OPD");
      setInterval(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      onClose();
      AlertComponent.Error(error.response.data.message);
    }
  };

  return (
    <Dialog
      open={isOpen}
      handler={onClose}
      size="lg"
      className="bg-transparent shadow-none"
    >
      <Card className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <MapContainer
            center={center}
            zoom={center ? 16 : 12}
            style={{ height: "500px", width: "100%" }}
            className="rounded-lg"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker center={center} onClick={handleMapClick} />
            <SetMapCenter center={center} />
          </MapContainer>
        </div>
        <div className="md:max-h-[500px] overflow-y-auto w-full md:w-1/2">
          <CardBody className="flex flex-col gap-2">
            <Typography variant="h4" color="blue-gray">
              Update OPD
            </Typography>
            <Input
              label="Nama OPD"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              crossOrigin={undefined}
              required
            />
            <Input
              label="Email OPD"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              crossOrigin={undefined}
              required
            />
            <Input
              label="Alamat Lengkap OPD"
              size="lg"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              crossOrigin={undefined}
              required
            />
            <p className="text-xs text-red-500">*Klik posisi di map</p>
            <Input
              label="Latitude"
              size="lg"
              value={latitude}
              onChange={(e) => setLatitude(parseFloat(e.target.value))}
              crossOrigin={undefined}
              required
            />
            <Input
              label="Longitude"
              size="lg"
              value={longitude}
              onChange={(e) => setLongitude(parseFloat(e.target.value))}
              crossOrigin={undefined}
              required
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="filled"
              className="bg-main flex justify-center items-center"
              onClick={handleSave}
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? <Spinner className="mx-auto" /> : "Simpan"}
            </Button>
            <Button variant="text" fullWidth onClick={onClose} className="mt-2">
              Batal
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Dialog>
  );
};
