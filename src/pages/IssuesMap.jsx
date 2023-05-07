// import React, { Component } from "react";
// import classes from "./Issues.module.css";
// import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
// import Legend from "../components/map/Legend";
// import { useState, useCallback } from "react";
// import { getCoordinatesFromAddress } from "../common/geo-converter";
// import Geocode from "react-geocode";
// import { useEffect } from "react";
// import AddMapIssue from "../map-components/AddMapIssue";
//
// Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_KEY);
//
// const IssuesMap = () => {
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
//   });
//
//   const containerStyle = {
//     width: "100%",
//     height: "100vh",
//   };
//
//   const [latitude, setLatitude] = useState(0);
//   const [longitude, setLongitude] = useState(0);
//
//   const center = {
//     lat: 46.776311027360464,
//     lng: 23.61925700540973,
//   };
//
//   const center2 = {
//     lat: 46.75732367778449,
//     lng: 23.584063464558163,
//   };
//
//   const center3 = {
//     lat: 46.753008660009684,
//     lng: 23.603391050999836,
//   };
//
//   const center4 = {
//     lat: 46.783581701071476,
//     lng: 23.614425473414663,
//   };
//
//   const center5 = {
//     lat: 46.744506784339,
//     lng: 23.583269135631173,
//   };
//
//   const [map, setMap] = useState(null);
//
//   const onLoad = useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);
//     setMap(map);
//   }, []);
//
//   const onUnmount = useCallback(function callback(map) {
//     setMap(null);
//   }, []);
//
//   const handleClick = () => {
//     console.log("da");
//     getCoordinatesFromAddress("Strada Memorandumului, Cluj-Napoca, Romania");
//   };
//
//   const getCoordinatesFromAddress = (address) => {
//     Geocode.fromAddress(address).then(
//       (response) => {
//         const { lat, lng } = response.results[0].geometry.location;
//         setLatitude(lat);
//         setLongitude(lng);
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   };
//
//   return (
//     <div>
//       {/* <iframe
//         className={classes.base}
//         style={{ width: "100%", height: "50vh" }}
//         src="https://maps.google.com/maps?q=Cluj-Napoca,%20Facultatea%20de%20automatica%20si%20calculatoare&t=&z=13&ie=UTF8&iwloc=&output=embed"
//       ></iframe> */}
//       {/* <div className="inline-block mr-auto pt-1">
//         {geoLocation.loaded
//           ? JSON.stringify(geoLocation)
//           : "Location data not available yet."}
//         Goog
//         </div> */}
//       {isLoaded ? (
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={12}
//           onLoad={onLoad}
//           onUnmount={onUnmount}
//         >
//           <Marker
//             icon={{
//               url: require("./images/plus.png"),
//               scaledSize: new window.google.maps.Size(16, 16),
//             }}
//             position={center}
//           />
//           <Marker
//             icon={{
//               url: require("./images/time.png"),
//               scaledSize: new window.google.maps.Size(16, 16),
//             }}
//             position={center2}
//           />
//           <Marker
//             icon={{
//               url: require("./images/build.png"),
//               scaledSize: new window.google.maps.Size(20, 20),
//             }}
//             onClick={handleClick}
//             position={center3}
//           />
//           <Marker
//             icon={{
//               url: require("./images/arrow.png"),
//               scaledSize: new window.google.maps.Size(18, 18),
//             }}
//             position={center4}
//           />
//           <Marker
//             icon={{
//               url: require("./images/solved.png"),
//               scaledSize: new window.google.maps.Size(16, 16),
//             }}
//             position={center5}
//             onClick={handleClick}
//           />
//           <></>
//         </GoogleMap>
//       ) : (
//         <></>
//       )}
//       <Legend />
//       <AddMapIssue />
//     </div>
//   );
// };
//
// export default IssuesMap;
