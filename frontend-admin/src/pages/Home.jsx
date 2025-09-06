import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin panel of InfoSphere</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/" className="btn btn-primary">Go to Dashboard</Link>
      </div>
    </div>
  );
}
