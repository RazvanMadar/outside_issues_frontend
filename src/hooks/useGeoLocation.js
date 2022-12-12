import { useState, useEffect } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const handleSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const handleError = (error) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    console.log(location);
    return location;
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      handleError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    getCurrentLocation();
  }, []);
};

export default useGeoLocation;
