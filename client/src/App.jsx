import { useState } from 'react';
import './App.css';
import { getRecommendations } from './services/api';

function App() {
  const [preference, setPreference] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!preference.trim()) return;

    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const recommendations = await getRecommendations(preference);
      setMovies(recommendations);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>🎬 AI Movie Recommender</h1>
        <p>Tell us what you like, and we'll pick the perfect movie.</p>
      </header>

      <main>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            placeholder="E.g., 90s action movies set in space..."
            disabled={loading}
          />
          <button type="submit" disabled={loading || !preference.trim()}>
            {loading ? 'Finding Movies...' : 'Get Recommendations'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="movie-list">
          {movies.map((movie, index) => (
            <div key={index} className="movie-card">
              <div className="movie-info">
                <h2>{movie.title} <span className="movie-year">({movie.year})</span></h2>
                <p>{movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
