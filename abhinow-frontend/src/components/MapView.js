import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
  InfoWindow
} from '@react-google-maps/api';
import { useState, useCallback } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '12px',
};

// Hyderabad center
const hyderabadCenter = {
  lat: 17.4065,
  lng: 78.4772
};

const mapOptions = {
  styles: [
    { elementType: 'geometry',
      stylers: [{ color: '#1a1a1a' }] },
    { elementType: 'labels.text.stroke',
      stylers: [{ color: '#1a1a1a' }] },
    { elementType: 'labels.text.fill',
      stylers: [{ color: '#746855' }] },
    { featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#2a2a2a' }] },
    { featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212121' }] },
    { featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }] },
    { featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }] },
    { featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#0f0f0f' }] },
    { featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }] },
    { featureType: 'poi',
      stylers: [{ visibility: 'off' }] },
  ],
  disableDefaultUI: false,
  zoomControl: true,
};

const MapView = ({
  pickup,
  drop,
  waypoints = [],
  showDirections = false,
  driverLocation = null,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries: ['places'],
  });

  const [directions, setDirections] = useState(null);
  const [selected, setSelected]     = useState(null);
  const [map, setMap]               = useState(null);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);

    // Calculate directions if pickup and drop given
    if (showDirections && pickup && drop) {
      const directionsService =
        new window.google.maps.DirectionsService();

      const waypointsList = waypoints.map(w => ({
        location: w,
        stopover: true,
      }));

      directionsService.route(
        {
          origin: pickup,
          destination: drop,
          waypoints: waypointsList,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') setDirections(result);
        }
      );
    }
  }, [pickup, drop, waypoints, showDirections]);

  if (!isLoaded) return (
    <div style={styles.loading}>Loading map... 🗺️</div>
  );

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={hyderabadCenter}
      zoom={12}
      options={mapOptions}
      onLoad={onLoad}>

      {/* Show directions route */}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: '#00d4aa',
              strokeWeight: 5,
              strokeOpacity: 0.8,
            },
            suppressMarkers: false,
          }}
        />
      )}

      {/* Driver live location marker */}
      {driverLocation && (
        <Marker
          position={driverLocation}
          icon={{
            url: 'data:image/svg+xml;charset=UTF-8,' +
              encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg"
                  width="40" height="40" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="18"
                    fill="#00d4aa" stroke="#fff" stroke-width="3"/>
                  <text x="20" y="26" text-anchor="middle"
                    font-size="18">🚗</text>
                </svg>`),
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          onClick={() => setSelected('driver')}
        />
      )}

      {/* Info window for driver */}
      {selected === 'driver' && driverLocation && (
        <InfoWindow
          position={driverLocation}
          onCloseClick={() => setSelected(null)}>
          <div style={{ color: '#000', padding: '4px' }}>
            🚗 Driver is here!
          </div>
        </InfoWindow>
      )}

    </GoogleMap>
  );
};

const styles = {
  loading: {
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#1a1a1a',
    borderRadius: '12px',
    color: '#555',
  },
};

export default MapView;