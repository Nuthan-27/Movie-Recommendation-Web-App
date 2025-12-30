import { useState, useEffect } from 'react';
import './App.css';
import { getRecommendations } from './services/api';

function App() {
  const [preference, setPreference] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [posterUrl, setPosterUrl] = useState(null); // State for real poster

  // Fetch poster when selectedMovie changes
  useEffect(() => {
    if (selectedMovie) {
      setPosterUrl(null); // Reset first
      
      const fetchPoster = async () => {
        try {
          const response = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(selectedMovie.title)}`
          );
          const data = await response.json();
          if (data.originalimage && data.originalimage.source) {
            setPosterUrl(data.originalimage.source);
          } else if (data.thumbnail && data.thumbnail.source) {
             setPosterUrl(data.thumbnail.source);
          }
        } catch (err) {
          console.error("Failed to fetch poster:", err);
          // Fallback handled by the img src logic below
        }
      };

      fetchPoster();
    }
  }, [selectedMovie]);

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

  // Fallback: Plain dark background (HD size), no text as requested
  const getPlaceholderImage = () => 
    `https://placehold.co/900x450/141414/141414.png?text=%20`;

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
            <div 
              key={index} 
              className="movie-card" 
              onClick={() => setSelectedMovie(movie)}
              style={{ cursor: 'pointer' }}
            >
              <div className="movie-info">
                <h2>{movie.title} <span className="movie-year">({movie.year})</span></h2>
                <p>{movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedMovie(null)}>×</button>
            
            <div className="modal-header">
               {/* Real Poster with Fallback */}
              <img 
                src={posterUrl || getPlaceholderImage()} 
                alt={`${selectedMovie.title} Backdrop`} 
                className="movie-poster"
                // If real poster fails to load, revert to plain placeholder
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = getPlaceholderImage();
                }}
              />
              <div className="modal-hgroup">
                <h2>{selectedMovie.title}</h2>
                <div>
                  <span className="modal-year">{selectedMovie.year}</span>
                  <span className="modal-rating">{selectedMovie.rating ? `Match ${selectedMovie.rating}` : '98% Match'}</span>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <p className="modal-description">{selectedMovie.description}</p>
              
              <div className="modal-meta">
                <p><strong>🎭 Genre:</strong> {selectedMovie.genre || 'Unknown'}</p>
                <p><strong>🎬 Director:</strong> {selectedMovie.director || 'Unknown'}</p>
                <p><strong>👥 Cast:</strong> {selectedMovie.cast || 'Unknown'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
