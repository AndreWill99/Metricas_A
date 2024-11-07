import React, { useEffect, useState } from 'react';
import './DeathCount.css';

// Constantes para os cálculos baseados nas taxas fornecidas
const INITIAL_POPULATION = 8186855000;
const ANNUAL_DEATHS = 61600000;
const DAILY_DEATHS = ANNUAL_DEATHS / 365;
const DEATHS_PER_SECOND = DAILY_DEATHS / 86400;

const ANNUAL_BIRTHS = 148000000;
const DAILY_BIRTHS = ANNUAL_BIRTHS / 365;
const BIRTHS_PER_SECOND = DAILY_BIRTHS / 86400;

const DeathCount: React.FC = () => {
  const [yearlyDeaths, setYearlyDeaths] = useState<number>(0);
  const [dailyDeaths, setDailyDeaths] = useState<number>(0);
  const [yearlyBirths, setYearlyBirths] = useState<number>(0);
  const [dailyBirths, setDailyBirths] = useState<number>(0);
  const [population, setPopulation] = useState<number>(INITIAL_POPULATION);

  // Data do início do ano e do dia
  const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();
  const startOfDay = new Date().setHours(0, 0, 0, 0);

  useEffect(() => {
    const updateStats = () => {
      const now = Date.now();

      // Calcular as mortes e nascimentos desde o início do ano
      const secondsSinceYearStart = (now - startOfYear) / 1000;
      const deathsThisYear = secondsSinceYearStart * DEATHS_PER_SECOND;
      const birthsThisYear = secondsSinceYearStart * BIRTHS_PER_SECOND;

      // Calcular as mortes e nascimentos desde o início do dia
      const secondsSinceDayStart = (now - startOfDay) / 1000;
      const deathsToday = secondsSinceDayStart * DEATHS_PER_SECOND;
      const birthsToday = secondsSinceDayStart * BIRTHS_PER_SECOND;

      // Atualizar a população mundial estimada
      const currentPopulation = INITIAL_POPULATION + (birthsThisYear - deathsThisYear);

      // Atualizar estados
      setYearlyDeaths(deathsThisYear);
      setDailyDeaths(deathsToday);
      setYearlyBirths(birthsThisYear);
      setDailyBirths(birthsToday);
      setPopulation(currentPopulation);
    };

    // Intervalo para atualizar as estatísticas a cada segundo
    updateStats();
    const interval = setInterval(updateStats, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="death-count">
      <PopulationDisplay population={population} />
      <div className="stats">
        <StatsCard title="Mortes" yearly={yearlyDeaths} daily={dailyDeaths} />
        <StatsCard title="Nascimentos" yearly={yearlyBirths} daily={dailyBirths} />
      </div>
    </div>
  );
};

// Componente para exibir a População Mundial com formatação
const PopulationDisplay: React.FC<{ population: number }> = ({ population }) => (
  <div className="population">
    <h2>População Mundial Atual</h2>
    <p><strong>{population.toLocaleString()}</strong></p>
  </div>
);

// Componente para exibir as estatísticas de nascimentos e mortes com formatação
const StatsCard: React.FC<{ title: string; yearly: number; daily: number }> = ({ title, yearly, daily }) => (
  <div className="stats-card">
    <h3>{title}</h3>
    <p>Este ano: <strong>{yearly.toLocaleString()}</strong></p>
    <p>Hoje: <strong>{daily.toLocaleString()}</strong></p>
  </div>
);

export default DeathCount;
