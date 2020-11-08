import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";

const Map = () => {
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
    setCurrentPosition({ lat, lng });
  };
  const mapStyles = {
    height: "80vh",
    width: "100%",
  };

  return (
    <Container>
      <div className="map" data-cy="map">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={currentPosition}
          >
            {currentPosition.lat ? (
              <Marker
                position={currentPosition}
                onDragEnd={(e) => onMarkerDragEnd(e)}
                draggable={true}
              />
            ) : null}
          </GoogleMap>
        </LoadScript>
      </div>
    </Container>
  );
};

export default Map;
