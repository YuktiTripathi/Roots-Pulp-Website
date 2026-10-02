import { expectations } from "@/lib/clinic";

export function ExpectationsSection() {
  const published = expectations.filter((item) => item.published);

  return (
    <section className="section expectations" aria-labelledby="expect-heading">
      <div className="section-inner">
        <div className="section-heading">
          <h2 id="expect-heading">What you can expect here</h2>
        </div>
        <ol className="expect-grid">
          {published.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
