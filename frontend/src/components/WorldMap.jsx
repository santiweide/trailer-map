import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useState } from 'react';
import axios from 'axios';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

export default function WorldMap() {
  const [hovered, setHovered] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const handleMouseEnter = async (geo) => {
    const code = geo.properties.ISO_A2;
    setHovered(geo.properties.NAME);
    try {
      const res = await axios.get(`/api/flag/${code}`);
      setImgUrl(res.data.url);
    } catch {
      setImgUrl(null);
    }
  };

  const handleMouseLeave = () => {
    setHovered(null);
    setImgUrl(null);
  };

  return (
    <div>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => handleMouseEnter(geo)}
                onMouseLeave={handleMouseLeave}
                style={{
                  default: { fill: '#EEE', stroke: '#FFF' },
                  hover: { fill: '#CFD8DC', stroke: '#607D8B' },
                  pressed: { fill: '#FF5722' },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>

      {hovered && imgUrl && (
        <div style={{
          position: 'absolute',
          top: 100,
          left: 50,
          background: '#fff',
          padding: '10px',
          border: '1px solid #ccc'
        }}>
          <h4>{hovered}</h4>
          <img src={imgUrl} alt={hovered} width={150} />
        </div>
      )}
    </div>
  );
}
