// Program.cs
// This is the entry point of our backend API (InfoSphere.API)

// Create the application builder
var builder = WebApplication.CreateBuilder(args);

// Build the app
var app = builder.Build();

// ✅ Test Endpoint
// When you open http://localhost:5000/api/hello in your browser
// It will return "Hello from InfoSphere Backend 🚀"
app.MapGet("/api/hello", () => "Hello from InfoSphere Backend 🚀");

// Run the app
app.Run();
