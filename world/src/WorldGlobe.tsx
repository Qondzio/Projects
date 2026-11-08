import Globe from 'react-globe.gl';
import './styles/WorldGlobe.css';
import GlobePhoto from './assets/earth-map.jpg';
import BackgroundPhoto from './assets/earth-background.jpg';
import { useState } from 'react';

function WorldGlobe({countriesData, setSelectedCountry}: {countriesData: any[]; setSelectedCountry: (country: string | null) => void}) {
  const [hovered, setHovered] = useState<any>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });


  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onMouseMove={(e) =>
        setMousePos({ x: e.clientX, y: e.clientY })
      }
    >
      <Globe
        globeImageUrl={GlobePhoto}
        backgroundImageUrl={BackgroundPhoto}
        polygonsData={countriesData}
        polygonCapColor={(d) =>
          d === hovered ? '#d64848' : 'rgba(255,255,255,0.01)'
        }
        polygonStrokeColor={()=>'#d64848'}
        polygonSideColor={() => 'rgba(32, 163, 28, 0)'}
        onPolygonHover={(polygon) => {
          setHovered(polygon);

          const canvas = document.querySelector('canvas');
          if (canvas) {
            canvas.style.cursor = polygon ? 'pointer' : 'default';
          }
        }}
        onPolygonClick={(polygon: any)=>{
         setSelectedCountry(polygon.properties.NAME)
         
          
        }}
      />

      {hovered && (
        <div
          style={{
            position: 'fixed',
            left: mousePos.x + 15,
            top: mousePos.y + 15,
            pointerEvents: 'none',
            zIndex: 1000,
            background: '#222',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: '5px',
          }}
        >
          {hovered.properties.ADMIN}
        </div>
      )}
    </div>
  );
}

export default WorldGlobe;