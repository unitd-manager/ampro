import React, { useState } from 'react';
import { GoogleMap, useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const PlacesSearch = () => {
  const [places, setPlaces] = useState([]);
  const [pincode, setPincode] = useState('');

  // Load the Google Maps JavaScript API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBHLHnqaZwIO-KmE6d9OI0eHCZPt3HGRY8', // replace with your API key
    //libraries: ['places'],
  });

  const handleSearch = async () => {
    if (!pincode) return;

    // Geocode the pincode to get coordinates
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: pincode }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;

        // Search for places near the coordinates
        const service = new window.google.maps.places.PlacesService(
          document.createElement('div')
        );

        const request = {
          location,
          radius: '5000', // radius in meters
          type: ['point_of_interest'], // adjust type as needed
        };

        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setPlaces(results);
          } else {
            console.error('Places search failed:', status);
          }
        });
      } else {
        console.error('Geocode failed:', status);
      }
    });
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />
      <button onClick={handleSearch}>Search Places</button>

      <ul>
        {places.map((place) => (
          <li key={place.place_id}>{place.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlacesSearch;
