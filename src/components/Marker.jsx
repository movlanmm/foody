import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Marker, useMap } from "react-leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";

const CustomMarker = ({ position, children }) => {
  const map = useMap();

  const customIcon = L.icon({
    iconUrl: "/images/pin.png",
    iconSize: [25, 40],
    iconAnchor: [25, 50],
  });

  return (
    <Marker position={position} icon={customIcon}>
      {children}
    </Marker>
  );
};

export default CustomMarker;
