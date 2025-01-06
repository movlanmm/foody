import React, { useState } from "react";
import { MapContainer, Popup, TileLayer, useMapEvents } from "react-leaflet";
import CustomMarker from "./Marker";
import { useEffect } from "react";

export default function Map({location,position,setPosition}) {

    function LocationMarker() {
        const map = useMapEvents({
        click(e) {
            setPosition([e.latlng.lat,e.latlng.lng]);
            map.flyTo(e.latlng, map.getZoom());
        },
        });

        return position === null ? null : (
        <CustomMarker position={position}>
            <Popup>You clicked here</Popup>
        </CustomMarker>
        );

    }

    function getPosition() {
        if (!navigator.geolocation)
          return "Your Browser doesn't support location service";
        
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition([
              pos.coords.latitude,
              pos.coords.longitude,
            ]);
          },
          (err) => {
            // do sth for error handling
          }
  )};

  useEffect(()=>{
    getPosition()
  },[])


  return (
    <MapContainer center={location ? location : [40.3743,49.8330]} zoom={13} scrollWheelZoom={false} className="z-10 w-full h-full r">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
  
    {location ? <CustomMarker position={location} />  :  <LocationMarker />}
    
    </MapContainer>
  );
}