import { useEffect, useState } from 'react';
import WorldGlobe from './WorldGlobe.tsx';
import Search from './Search.tsx';
import News from './News.tsx'

function App() {
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry]= useState<string | null>(null);

  useEffect(() => {
    fetch('/geoBoundariesCGAZ_ADM0.json')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => setCountriesData(data.features))
      .catch((error) =>
        console.error('Failed to fetch countries data:', error)
      );
  }, []);

  return (
    <>
      <WorldGlobe countriesData={countriesData} setSelectedCountry={setSelectedCountry}/>
      <Search countriesData={countriesData} setSelectedCountry={setSelectedCountry}/>
      <News selectedCountry={selectedCountry}/>
    </>
  );
}

export default App;