import React from 'react';
import DeathCount from './components/DeathCount';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="header">
        <h1>Estatísticas Mundiais em Tempo Real</h1>
      </header>
      <main className="main">
        <DeathCount />
      </main>
    </div>
  );
};

export default App;