import "./Contribute.css";

export default function Contribute() {
  return (
    <div className="contribute-container">
      <h1>💡 Contribute</h1>
      <p>Have a new policy or update? Submit your contribution below 👇</p>

      <form className="contribute-form">
        <label>Policy Title</label>
        <input type="text" placeholder="Enter policy title" />

        <label>Category</label>
        <select>
          <option>HR</option>
          <option>IT</option>
          <option>Finance</option>
          <option>Operations</option>
          <option>Compliance</option>
        </select>

        <label>Policy Content</label>
        <textarea placeholder="Write policy details here..." rows="5"></textarea>

        <button type="submit">Submit Contribution</button>
      </form>
    </div>
  );
}
