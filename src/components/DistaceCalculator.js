import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DistanceCalculator = ({pincode}) => {
  //const [pincode, setPincode] = useState('');
  const [localities, setLocalities] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState('');
  const [latLng, setLatLng] = useState(null);
  const [distance, setDistance] = useState('');
  const [error, setError] = useState('');

  // Your Google Maps API key
  const apiKey = 'AIzaSyBHLHnqaZwIO-KmE6d9OI0eHCZPt3HGRY8'; // Replace with your actual API key

  // Store location (replace with the actual address of your store)
  const storeAddress = 'Namakkal, Tamil Nadu 637001, India'; // Example: "1600 Amphitheatre Parkway, Mountain View, CA"

  // Fetch localities based on pincode
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

  // Fetch latitude and longitude of selected locality
  const fetchLatLng = async (locality) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: locality,
            key: apiKey,
            type: 'landmark',
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

  // Fetch the distance between the selected locality and the store
  const fetchDistance = async (origin, destination) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json`,
        {
          params: {
            origins: origin,
            destinations: destination,
            key: apiKey,
            mode: 'driving', // You can change this to 'walking', 'bicycling', or 'transit' if needed
          },
        }
      );

      if (response.data.status === 'OK') {
        const distanceText = response.data.rows[0].elements[0].distance.text;
        setDistance(distanceText);
        setError('');
      } else {
        setError('Unable to calculate distance. Please try again.');
      }
    } catch (err) {
      setError('Error calculating distance. Please check your API key and network connection.');
    }
  };

  const handleSelectLocality = async (event) => {
    const selected = event.target.value;
    setSelectedLocality(selected);
    await fetchLatLng(selected);
    fetchDistance(selected, storeAddress); // Calculate distance when locality is selected
  };
useEffect(()=>{
  fetchLocalities();
},[pincode])
  return (
    <div>
      <h2>Find Localities by Pincode</h2>
      {/* <input
        type="text"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        placeholder="Enter Pincode"
      />
      <button onClick={fetchLocalities}>Get Localities</button> */}

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

      {distance && <p>Distance to Store: {distance}</p>}
    </div>
  );
};

export default DistanceCalculator;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const DistanceCalculator = ({ pincode }) => {
//   const [localities, setLocalities] = useState([]);
//   const [selectedLocality, setSelectedLocality] = useState('');
//   const [latLng, setLatLng] = useState(null);
//   const [distance, setDistance] = useState('');
//   const [error, setError] = useState('');

//   // Your Google Maps API key
//   const apiKey = 'AIzaSyBHLHnqaZwIO-KmE6d9OI0eHCZPt3HGRY8'; // Replace with your actual API key

//   // Store location (replace with the actual address of your store)
//   const storeAddress = 'Namakkal, Tamil Nadu 637001, India'; // Example store address

//   // Fetch localities based on pincode using Places API
//   const fetchLocalities = async () => {
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/place/textsearch/json`,
//         {
//           params: {
//             query: pincode,
//             key: apiKey,
//             type: 'point_of_interest', // You can change or add more types like 'establishment', 'landmark', etc.
//           },
//         }
//       );

//       if (response.data.status === 'OK') {
//         const results = response.data.results;
//         const localitiesList = results.map((result) => ({
//           name: result.name,
//           address: result.formatted_address,
//           location: result.geometry.location,
//         }));
//         setLocalities(localitiesList);
//         setError('');
//       } else {
//         setError('No landmarks found for this pincode.');
//         setLocalities([]);
//       }
//     } catch (error) {
//       setError('Error fetching localities. Please check your network connection.');
//       console.error('Fetch Localities Error:', error);
//     }
//   };

//   // Fetch the distance between the selected locality and the store
//   const fetchDistance = async (origin, destination) => {
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/distancematrix/json`,
//         {
//           params: {
//             origins: origin,
//             destinations: destination,
//             key: apiKey,
//             mode: 'driving', // Change this to other modes if needed
//           },
//         }
//       );

//       if (response.data.status === 'OK') {
//         const distanceText = response.data.rows[0].elements[0].distance.text;
//         setDistance(distanceText);
//         setError('');
//       } else {
//         setError('Unable to calculate distance. Please try again.');
//       }
//     } catch (err) {
//       setError('Error calculating distance. Please check your API key and network connection.');
//       console.error('Fetch Distance Error:', err);
//     }
//   };

//   const handleSelectLocality = (event) => {
//     const selectedIndex = event.target.value;
//     const selected = localities[selectedIndex];
//     setSelectedLocality(selected.name);
//     setLatLng(selected.location);
//     fetchDistance(`${selected.location.lat},${selected.location.lng}`, storeAddress); // Calculate distance when locality is selected
//   };

//   useEffect(() => {
//     if (pincode) {
//       fetchLocalities();
//     }
//   }, [pincode]);

//   return (
//     <div>
//       <h2>Find Landmarks by Pincode</h2>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {localities.length > 0 && (
//         <select value={selectedLocality} onChange={handleSelectLocality}>
//           <option value="">Select a landmark</option>
//           {localities.map((locality, index) => (
//             <option key={index} value={index}>
//               {locality.name} - {locality.address}
//             </option>
//           ))}
//         </select>
//       )}

//       {latLng && (
//         <div>
//           <p>Latitude: {latLng.lat}</p>
//           <p>Longitude: {latLng.lng}</p>
//         </div>
//       )}

//       {distance && <p>Distance to Store: {distance}</p>}
//     </div>
//   );
// };

// export default DistanceCalculator;

