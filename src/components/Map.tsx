'use client';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

export default function Map() {
  const mapRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      const map = mapRef.current;
      if (map) {
        // @ts-expect-error - Leaflet types are not complete
        map._leaflet_id = null;
      }
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        ref={mapRef}
        center={[37.5407, -77.4360]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
          position={[37.5407, -77.4360]}
          eventHandlers={{
            mouseover: (e) => e.target.openPopup(),
            mouseout: (e) => e.target.closePopup(),
          }}
        >
          <Popup>
            Richmond, Virginia
          </Popup>
        </Marker>
        <Marker 
          position={[37.551413176698944, -77.4737886067466]}
          eventHandlers={{
            mouseover: (e) => e.target.openPopup(),
            mouseout: (e) => e.target.closePopup(),
          }}
        >
          <Popup>
            Sun&apos;s favorite spot to heal
          </Popup>
        </Marker>
        <Marker 
          position={[37.529879, -77.444016]}
          eventHandlers={{
            mouseover: (e) => e.target.openPopup(),
            mouseout: (e) => e.target.closePopup(),
          }}
        >
          <Popup>
            Sun&apos;s favorite spot to walk
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
} 