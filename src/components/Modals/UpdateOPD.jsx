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
import DeviceService from "../../services/service/DeviceService";
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
  const [guid, setGuid] = useState("");
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    console.log(data);
    if (data) {
      setCenter({ lat: data.latitude, lng: data.longitude });
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      setName(data.name || "");
      setGuid(data.guid || "");
      setType(data.type || "");
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
      guidDevice: guid,
      name: name,
      type: type,
      latitude: latitude,
      longitude: longitude,
    };
    try {
      const response = await DeviceService.UpdateDevice(guid, data);
      setIsLoading(false);
      onClose();
      AlertComponent.SuccessResponse(response.data.message);
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
              label="Nama Device"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <select
              name="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="p-3 border rounded-md border-blue-gray-200"
            >
              <option value="">Tipe Perangkat</option>
              <option value="Aktuator">Sirine</option>
              <option value="Sensor">Tombol</option>
            </select>
            <p className="text-xs text-red-500">*Klik posisi di map</p>
            <Input
              label="Latitude"
              size="lg"
              value={latitude}
              onChange={(e) => setLatitude(parseFloat(e.target.value))}
              required
            />
            <Input
              label="Longitude"
              size="lg"
              value={longitude}
              onChange={(e) => setLongitude(parseFloat(e.target.value))}
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
