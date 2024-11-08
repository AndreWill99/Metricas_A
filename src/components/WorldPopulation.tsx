import React from 'react';
import './WolrdPopulation.css'; // Create this CSS file

interface WorldPopulationProps {
  population: number;
}

const WorldPopulation: React.FC<WorldPopulationProps> = ({ population }) => {
  return (
    <div className="world-population-container">
      <div className="world-population-label">População Mundial Atual</div>
      <div className="world-population-value">{population.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
    </div>
  );
};

export default WorldPopulation;
