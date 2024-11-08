import React, { useState, useEffect } from 'react';
import './App.css';
import DeathCount from './components/DeathCount';
import BirthCount from './components/BirthCount';
import WorldPopulation from './components/WorldPopulation';


const INITIAL_WORLD_POPULATION = 8000000000;
const WORLD_BIRTH_RATE = 18.5 / 1000;
const WORLD_DEATH_RATE = 7.7 / 1000;

const BRAZIL_POPULATION = 213000000;
const BRAZIL_DEATH_RATE = 8.5 / 1000;

const App: React.FC = () => {
  const [currentWorldPopulation, setCurrentWorldPopulation] = useState(INITIAL_WORLD_POPULATION);

  useEffect(() => {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();

    function updatePopulation() {
      const now = Date.now();
      const secondsSinceYearStart = (now - startOfYear) / 1000;

      const annualBirths = INITIAL_WORLD_POPULATION * WORLD_BIRTH_RATE;
      const annualDeaths = INITIAL_WORLD_POPULATION * WORLD_DEATH_RATE;
      const birthsThisYear = (annualBirths / 365 / 86400) * secondsSinceYearStart;
      const deathsThisYear = (annualDeaths / 365 / 86400) * secondsSinceYearStart;

      setCurrentWorldPopulation(INITIAL_WORLD_POPULATION + birthsThisYear - deathsThisYear);
    }

    updatePopulation();
    const interval = setInterval(updatePopulation, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>Métricas de População Mundial em Tempo Real</h1>
      
      <div className="metric-section">
      <WorldPopulation population={currentWorldPopulation} /> {/* Use the new component */}
        
        <DeathCount label="Mortes no Mundo" annualRate={WORLD_DEATH_RATE} population={INITIAL_WORLD_POPULATION} />
        <BirthCount label="Nascimentos no Mundo" annualRate={WORLD_BIRTH_RATE} population={INITIAL_WORLD_POPULATION} />
        <DeathCount label="Mortes no Brasil" annualRate={BRAZIL_DEATH_RATE} population={BRAZIL_POPULATION} />
      </div>
      
      <footer>
        <h3>Fontes das Informações</h3>
        <ul>
          <li><a href="https://www.paho.org/pt/noticias/20-5-2022-oms-divulga-novas-estatisticas-mundiais-saude?form=MG0AV3" target="_blank" rel="noopener noreferrer">Taxa de mortalidade mundial</a></li>
          <li><a href="https://agenciadenoticias.ibge.gov.br/media/com_mediaibge/arquivos/d1328b48a4e5ad0e550379cc27b6884a.pdf?form=MG0AV3" target="_blank" rel="noopener noreferrer">Taxa de mortalidade no Brasil</a></li>
          <li><a href="https://countrymeters.info/pt/Brazil" target="_blank" rel="noopener noreferrer">Métricas do Brasil</a></li>
          <li><a href="https://www.worldometers.info/br/" target="_blank" rel="noopener noreferrer">Métricas globais</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default App;
