import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styles from "./Map.module.css"


  
  function Map({ center }) {
    return (
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        language="en"
      >
        <GoogleMap
          mapContainerClassName={styles.mapContainer}
          center={center}
          zoom={10}
        >
         
          {center.lat && center.lng && <Marker position={center} />}
        </GoogleMap>
      </LoadScript>
    )
  }
  
  export default Map