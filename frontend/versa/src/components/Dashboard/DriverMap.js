import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";
import Axios from "axios";

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
mapboxgl.accessToken =
    "pk.eyJ1IjoidmVyc2F5eWMiLCJhIjoiY2tsNjluazhnMWE4bDJ2cDd6a3RiejA1eiJ9.558zZUAEVhiZ71yh22H-oA";

// this is where the code for the next step will go
const DriverMap = () => {
    const mapContainerRef = useRef(null);
    const [zoom, setZoom] = useState(12);
    const [long, setLong] = useState(-114.0288);
    const [lat, setLat] = useState(51.0484);
    const [data, setData] = useState();

    useEffect(() => {
        const getDirections = async () => {
            const response = await Axios.get(
                `https://api.mapbox.com/directions/v5/mapbox/driving/-114.0288,51.0484;-114.07520916931425,51.03248665637012?geometries=geojson` +
                    mapboxgl.accessToken
            );
            return response.data;
        };
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [long, lat],
            zoom: zoom,
        });
        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        map.on("move", () => {
            setLong(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        // initialize the map canvas to interact with later
        const canvas = map.getCanvasContainer();

        // an arbitrary start will always be the same
        // only the end or destination will change
        const start = [long, lat];
        // map.addControl(
        //     new MapboxDirections({
        //         accessToken: mapboxgl.accessToken,
        //     })
        // );
        // create a function to make a directions request
        const getRoute = (end) => {
            // make a directions request using cycling profile
            // an arbitrary start will always be the same
            // only the end or destination will change
            const start = [long, lat];
            var url =
                "https://api.mapbox.com/directions/v5/mapbox/driving/" +
                start[0] +
                "," +
                start[1] +
                ";" +
                end[0] +
                "," +
                end[1] +
                "?steps=true&geometries=geojson&access_token=" +
                mapboxgl.accessToken;

            // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
            const req = new XMLHttpRequest();
            req.open("GET", url, true);
            req.onload = function () {
                const json = JSON.parse(req.response);
                const data = json.routes[0];
                const route = data.geometry.coordinates;
                const geojson = {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates: route,
                    },
                };
                // if the route already exists on the map, reset it using setData
                if (map.getSource("route")) {
                    map.getSource("route").setData(geojson);
                } else {
                    // otherwise, make a new request
                    map.addLayer({
                        id: "route",
                        type: "line",
                        source: {
                            type: "geojson",
                            data: {
                                type: "Feature",
                                properties: {},
                                geometry: {
                                    type: "LineString",
                                    coordinates: geojson,
                                },
                            },
                        },
                        layout: {
                            "line-join": "round",
                            "line-cap": "round",
                        },
                        paint: {
                            "line-color": "#3887be",
                            "line-width": 5,
                            "line-opacity": 0.75,
                        },
                    });
                }
                // add turn instructions here at the end
            };
            req.send();
        };

        map.on("load", function () {
            // make an initial directions request that
            // starts and ends at the same location
            getRoute(start);

            // Add starting point to the map
            map.addLayer({
                id: "point",
                type: "circle",
                source: {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: [
                            {
                                type: "Feature",
                                properties: {},
                                geometry: {
                                    type: "Point",
                                    coordinates: start,
                                },
                            },
                        ],
                    },
                },
                paint: {
                    "circle-radius": 10,
                    "circle-color": "#3887be",
                },
            });
            map.on("click", function (e) {
                const coordsObj = e.lngLat;
                canvas.style.cursor = "";
                const coords = Object.keys(coordsObj).map(function (key) {
                    return coordsObj[key];
                });
                const end = {
                    type: "FeatureCollection",
                    features: [
                        {
                            type: "Feature",
                            properties: {},
                            geometry: {
                                type: "Point",
                                coordinates: coords,
                            },
                        },
                    ],
                };
                if (map.getLayer("end")) {
                    map.getSource("end").setData(end);
                } else {
                    map.addLayer({
                        id: "end",
                        type: "circle",
                        source: {
                            type: "geojson",
                            data: {
                                type: "FeatureCollection",
                                features: [
                                    {
                                        type: "Feature",
                                        properties: {},
                                        geometry: {
                                            type: "Point",
                                            coordinates: coords,
                                        },
                                    },
                                ],
                            },
                        },
                        paint: {
                            "circle-radius": 10,
                            "circle-color": "#f30",
                        },
                    });
                }
                getRoute(coords);
            });
        });
        return () => map.remove();
    }, []);
    // const instructions = document.getElementById("instructions");
    // const steps = data.legs[0].steps;

    // const tripInstructions = [];
    // for (var i = 0; i < steps.length; i++) {
    //     tripInstructions.push("<br><li>" + steps[i].maneuver.instruction) +
    //         "</li>";
    //     instructions.innerHTML =
    //         '<br><span class="duration">Trip duration: ' +
    //         Math.floor(data.duration / 60) +
    //         " min 🏎  </span>" +
    //         tripInstructions;
    // }

    return (
        <div>
            {/*<Instructions id="instructions"></Instructions>*/}
            <Coordinates>
                Longitude: {long} Latitude: {lat} Zoom: {zoom}{" "}
            </Coordinates>
            <MapContainer className="map-container" ref={mapContainerRef} />
        </div>
    );
};

export default DriverMap;

const MapContainer = styled.div`
    display: grid;
    width: 50vw;
    height: 50vh;
`;

const Coordinates = styled.div`
    place-self: start;
`;
// const Instructions = styled.div`
//     /* place-self: start; */
//     position: absolute;
//     margin: 20px;
//     width: 25%;
//     top: 0;
//     bottom: 20%;
//     padding: 20px;
//     background-color: rgba(255, 255, 255, 0.9);
//     overflow-y: scroll;
//     font-family: sans-serif;
//     font-size: 0.8em;
//     line-height: 2em;
// `;
