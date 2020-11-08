import { GoogleMap, LoadScript, Marker, DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const Map = ({ from, to }) => {
  const [directions, setDirections] = useState()
  const [currentPosition, setCurrentPosition] = useState({});
  const apiKey = process.env.REACT_APP_MAPSDIRECTIONS_API_KEY;
  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  });
  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng })
  };
  const mapStyles = {
    height: "80vh",
    width: "100%",
  };
  const directionsCallback = (response) => {
    if (response !== null)
      setDirections(response)
  }
  return (
    <div className="map" data-cy="map">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition}>
          {
            currentPosition.lat ?
              <Marker position={currentPosition}
                onDragEnd={(e) => onMarkerDragEnd(e)}
                draggable={true} /> : null
          }
          {directions && <DirectionsRenderer
            // required
            options={{
              directions: directions
            }}
          />}
          {from && to && <DirectionsService
            // required
            options={{
              destination: from,
              origin: to,
              travelMode: "DRIVING"
            }}
            // required
            callback={directionsCallback}
          />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;