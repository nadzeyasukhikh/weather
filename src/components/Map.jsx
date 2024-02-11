import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const containerStyle = {
    width: '500px',
    height: '500px'
  };
  
  function Map({ center }) {
    return (
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        language="en"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
         
          {center.lat && center.lng && <Marker position={center} />}
        </GoogleMap>
      </LoadScript>
    )
  }
  
  export default Map