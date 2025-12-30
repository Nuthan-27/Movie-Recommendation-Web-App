async function test() {
  try {
    const response = await fetch('http://localhost:3000/api/movies/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferences: 'Funny animated movies about animals' })
    });
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}
test();
