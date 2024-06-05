const { app, port } = require('./src');

// Start the server
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});