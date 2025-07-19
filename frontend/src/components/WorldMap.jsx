import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseMapUrl = '/world-countries.json'; // 背景底图

export default function WorldMap() {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [hoveredGeoData, setHoveredGeoData] = useState(null);

  useEffect(() => {
    if (!hoveredCountry) {
      setHoveredGeoData(null);
      return;
    }

    const code = hoveredCountry.toLowerCase();
    print(code)
    axios
      .get(`/geo/${code}.json`)
      .then((res) => {
        setHoveredGeoData(res.data);
      })
      .catch(() => {
        setHoveredGeoData(null);
      });
  }, [hoveredCountry]);

  const handleMouseEnter = (geo) => {
    setHoveredCountry(geo.properties.ISO_A2);
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
  };

  return (
    <div>
      {/* 背景底图 */}
      <ComposableMap projectionConfig={{ scale: 140 }}>
        <Geographies geography={baseMapUrl}>
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

        {/* 高亮国家 */}
        {hoveredGeoData && (
          <Geographies geography={hoveredGeoData}>
            {({ geographies }) =>
              geographies.map((geo, i) => (
                <Geography
                  key={`hover-${i}`}
                  geography={geo}
                  style={{
                    default: { fill: '#FFCC00', stroke: '#000' },
                  }}
                />
              ))
            }
          </Geographies>
        )}
      </ComposableMap>
    </div>
  );
}
