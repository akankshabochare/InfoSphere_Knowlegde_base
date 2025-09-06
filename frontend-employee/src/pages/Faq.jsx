import "./Faq.css";
import { useState } from "react";

export default function Faq() {
  const [active, setActive] = useState(null);

  const faqs = [
    { q: "How can I apply for leave?", a: "You can apply through the HR portal under the Leave section." },
    { q: "What is the Work From Home policy?", a: "Employees can work from home up to 2 days per week with manager approval." },
    { q: "How to claim travel reimbursement?", a: "Upload bills in the Finance portal under Reimbursements." },
  ];

  return (
    <div className="faq-container">
      <h1>❓ FAQs</h1>
      {faqs.map((item, index) => (
        <div key={index} className="faq-item">
          <button className="faq-question" onClick={() => setActive(active === index ? null : index)}>
            {item.q}
          </button>
          {active === index && <div className="faq-answer">{item.a}</div>}
        </div>
      ))}
    </div>
  );
}
