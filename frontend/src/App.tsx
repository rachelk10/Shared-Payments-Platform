import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
}

export default App;

// Add global responsive styles
const styles = `
<style>
  :root {
    --max-width: 1440px;
    --container-padding: clamp(16px, 5vw, 48px);
  }

  .app {
    min-height: 100vh;
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--container-padding);
  }

  @media (max-width: 768px) {
    .app {
      padding: calc(var(--container-padding) / 2);
    }
  }

  /* Responsive typography */
  body {
    font-size: clamp(14px, 2vw, 16px);
    line-height: 1.5;
  }

  h1 { font-size: clamp(24px, 4vw, 36px); }
  h2 { font-size: clamp(20px, 3vw, 28px); }
  h3 { font-size: clamp(18px, 2.5vw, 24px); }

  /* Responsive spacing */
  .container {
    padding: clamp(16px, 3vw, 32px);
  }

  /* Responsive grid */
  .grid {
    display: grid;
    gap: clamp(16px, 3vw, 32px);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  }
</style>
`;

document.head.insertAdjacentHTML('beforeend', styles);
