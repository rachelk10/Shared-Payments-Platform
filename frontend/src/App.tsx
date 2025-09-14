import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="header">
        <h1>Shared Payment System</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/payments" className="nav-link">Payments</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </nav>
      </header>
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default App;

const styles = `
<style>
  .app {
    min-height: 100vh;
    background-color: #F2F2F7;
  }

  .header {
    background: linear-gradient(135deg, #007AFF, #00C6FF);
    padding: 16px 24px;
    color: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header h1 {
    font-family: -apple-system, system-ui, sans-serif;
    font-size: 28px;
    font-weight: bold;
    margin: 0;
  }

  .nav {
    display: flex;
    gap: 20px;
  }

  .nav-link {
    color: white;
    text-decoration: none;
    font-size: 16px;
    padding: 8px 16px;
    border-radius: 8px;
    transition: background-color 0.2s ease;
  }

  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .main {
    padding: 24px;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .container:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }

  h2 {
    font-family: -apple-system, system-ui, sans-serif;
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    margin: 0 0 20px 0;
  }
</style>
`;

document.head.insertAdjacentHTML('beforeend', styles);
