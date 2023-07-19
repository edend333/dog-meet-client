import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


export default function MapView() {
    const [arGardens, setArGardens,] = useState([])
    const nav = useNavigate();

    
    useEffect(() => {
        doApiGardens();
      }, [])
    
      const doApiGardens = async () => { 
        try{
           const url = API_URL + "/dog_gardens";
           const resp = await doApiGet(url)
           console.log(resp);
           
           setArGardens(resp)
        }
        catch(err){
           console.log(err);
           alert("There problem, come back later");
        }
      }


  return (
    <div className='container mt-4'>
      
      <MapContainer center={[31.25350436391142, 34.79157709871368]} zoom={12} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
            {arGardens && arGardens?.map((item,i)=>(
                <Marker key={item._id} position={[item.lat, item.lon]}>
                <Popup>
                {item.name}
              </Popup>
                </Marker>
            ))}
    
      </MapContainer>

    </div>
  )
}


// {
//   arCity.map(item => {
//       return(
//           <Marker key={item._id} position={[item.lat, item.lon]}>
              
//           {/* <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup> */}
//         </Marker>
//       )
//   })
// }