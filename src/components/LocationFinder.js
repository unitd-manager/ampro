import React, { useState } from 'react';
import axios from 'axios';

const LocationFinder = () => {
  const [pincode, setPincode] = useState('');
  const [localities, setLocalities] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState('');
  const [latLng, setLatLng] = useState(null);
  const [error, setError] = useState('');

  // Google Maps API key
  const apiKey = 'AIzaSyBHLHnqaZwIO-KmE6d9OI0eHCZPt3HGRY8'; // Replace with your actual API key

  // Function to fetch localities based on pincode
  const fetchLocalities = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: pincode,
            key: apiKey,
          },
        }
      );

      if (response.data.status === 'OK') {
        const results = response.data.results;
        const localitiesList = results
          .map((result) => result.formatted_address)
          .filter((address) => address.includes(pincode)); // Filter based on pincode
        setLocalities(localitiesList);
        setError('');
      } else {
        setError('No localities found for this pincode.');
        setLocalities([]);
      }
    } catch (error) {
      setError('Error fetching localities. Please check your network connection.');
    }
  };

  // Function to fetch latitude and longitude of selected locality
  const fetchLatLng = async (locality) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: locality,
            key: apiKey,
          },
        }
      );

      if (response.data.status === 'OK') {
        const location = response.data.results[0].geometry.location;
        setLatLng(location);
        setError('');
      } else {
        setError('Could not fetch coordinates for the selected locality.');
      }
    } catch (error) {
      setError('Error fetching coordinates. Please check your network connection.');
    }
  };

  const handleSelectLocality = (event) => {
    const selected = event.target.value;
    setSelectedLocality(selected);
    fetchLatLng(selected);
  };

  return (
    <div>
      <h2>Find Localities by Pincode</h2>
      <input
        type="text"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        placeholder="Enter Pincode"
      />
      <button onClick={fetchLocalities}>Get Localities</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {localities.length > 0 && (
        <select value={selectedLocality} onChange={handleSelectLocality}>
          <option value="">Select a locality</option>
          {localities.map((locality, index) => (
            <option key={index} value={locality}>
              {locality}
            </option>
          ))}
        </select>
      )}

      {latLng && (
        <div>
          <p>Latitude: {latLng.lat}</p>
          <p>Longitude: {latLng.lng}</p>
        </div>
      )}
    </div>
  );
};

export default LocationFinder;
