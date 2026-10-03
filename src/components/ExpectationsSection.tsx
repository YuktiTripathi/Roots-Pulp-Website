import { expectations } from "@/lib/clinic";
import { stagger } from "@/lib/motion";

export function ExpectationsSection() {
  const published = expectations.filter((item) => item.published);

  return (
    <section className="section expectations" aria-labelledby="expect-heading">
      <div className="section-inner">
        <div className="section-heading">
          <h2 id="expect-heading" className="reveal">What you can expect here</h2>
        </div>
        <ol className="expect-grid">
          {published.map((item, index) => (
            <li key={item.title} className="reveal" style={stagger(index + 1)}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
