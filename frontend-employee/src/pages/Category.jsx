import "./Category.css";

export default function Category() {
  // 📂 Dummy data
  const categories = [
    {
      name: "HR",
      policies: ["Leave Policy", "Work From Home Policy", "Code of Conduct"],
    },
    {
      name: "IT",
      policies: ["Password Policy", "VPN Access", "Laptop Replacement"],
    },
    {
      name: "Finance",
      policies: ["Travel Reimbursement", "Expense Claims", "Payroll Rules"],
    },
    {
      name: "Operations",
      policies: ["Office Entry Policy", "Visitor Guidelines"],
    },
    {
      name: "Compliance",
      policies: ["Data Privacy", "Anti-Bribery", "Security Compliance"],
    },
  ];

  return (
    <div className="category-container">
      <h1>📂 All Categories</h1>

      <div className="category-grid">
        {categories.map((cat) => (
          <div key={cat.name} className="category-box">
            <h2>{cat.name}</h2>
            <ul>
              {cat.policies.map((policy, index) => (
                <li key={index}>{policy}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
