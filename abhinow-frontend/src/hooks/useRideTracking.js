import { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useRideTracking = (rideId) => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [connected, setConnected]           = useState(false);
  const clientRef                           = useRef(null);

  useEffect(() => {
    if (!rideId) return;

    // Create STOMP client
    const client = new Client({
      webSocketFactory: () =>
        new SockJS('http://localhost:8080/ws'),

      onConnect: () => {
        setConnected(true);
        console.log('✅ WebSocket connected!');

        // Subscribe to this ride's location updates
        client.subscribe(
          `/topic/ride/${rideId}`,
          (message) => {
            const data = JSON.parse(message.body);
            setDriverLocation({
              lat: data.latitude,
              lng: data.longitude,
              driverName: data.driverName,
              timestamp: data.timestamp,
            });
          }
        );
      },

      onDisconnect: () => {
        setConnected(false);
        console.log('❌ WebSocket disconnected');
      },

      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      },
    });

    client.activate();
    clientRef.current = client;

    // Cleanup on unmount
    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [rideId]);

  // Function for driver to send location
  const sendLocation = (latitude, longitude, driverName) => {
    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: '/app/location.update',
        body: JSON.stringify({
          rideId,
          latitude,
          longitude,
          driverName,
        }),
      });
    }
  };

  return { driverLocation, connected, sendLocation };
};

export default useRideTracking;