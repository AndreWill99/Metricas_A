import React, { useEffect, useState } from 'react';
import './DeathCount.css';

interface DeathCountProps {
  label: string;
  annualRate: number;
  population: number;
}

const DeathCount: React.FC<DeathCountProps> = ({ label, annualRate, population }) => {
  const [deathsToday, setDeathsToday] = useState(0);
  const [deathsThisYear, setDeathsThisYear] = useState(0);

  useEffect(() => {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();
    const deathsPerYear = population * annualRate;
    const deathsPerDay = deathsPerYear / 365;

    const updateDeaths = () => {
      const now = Date.now();
      const secondsSinceYearStart = (now - startOfYear) / 1000;

      setDeathsToday(Math.floor(deathsPerDay / 86400 * secondsSinceYearStart % deathsPerDay));
      setDeathsThisYear(Math.floor((deathsPerYear / 365 / 86400) * secondsSinceYearStart));
    };

    updateDeaths();
    const interval = setInterval(updateDeaths, 1000);
    return () => clearInterval(interval);
  }, [annualRate, population]);

  return (
    <div className="death-count-container">
      <div className="death-count-label">{label}</div>
      <div className="death-count-value">Hoje: {deathsToday.toLocaleString()}</div>
      <div className="death-count-value">Este Ano: {deathsThisYear.toLocaleString()}</div>
    </div>
  );
};

export default DeathCount;
