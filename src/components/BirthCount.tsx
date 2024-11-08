import React, { useEffect, useState } from 'react';
import './BirthCount.css';

interface BirthCountProps {
  label: string;
  annualRate: number;
  population: number;
}

const BirthCount: React.FC<BirthCountProps> = ({ label, annualRate, population }) => {
  const [birthsToday, setBirthsToday] = useState(0);
  const [birthsThisYear, setBirthsThisYear] = useState(0);

  useEffect(() => {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();
    const birthsPerYear = population * annualRate;
    const birthsPerDay = birthsPerYear / 365;

    const updateBirths = () => {
      const now = Date.now();
      const secondsSinceYearStart = (now - startOfYear) / 1000;

      setBirthsToday(Math.floor(birthsPerDay / 86400 * secondsSinceYearStart % birthsPerDay));
      setBirthsThisYear(Math.floor((birthsPerYear / 365 / 86400) * secondsSinceYearStart));
    };

    updateBirths();
    const interval = setInterval(updateBirths, 1000);
    return () => clearInterval(interval);
  }, [annualRate, population]);

  return (
    <div className="birth-count-container">
      <div className="birth-count-label">{label}</div>
      <div className="birth-count-value">Hoje: {birthsToday.toLocaleString()}</div>
      <div className="birth-count-value">Este Ano: {birthsThisYear.toLocaleString()}</div>
    </div>
  );
};

export default BirthCount;
