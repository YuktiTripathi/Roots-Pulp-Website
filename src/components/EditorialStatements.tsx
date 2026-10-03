import { stagger } from "@/lib/motion";
export function EditorialStatements() {
  return (
    <>
      <section className="statement statement-smile" aria-labelledby="smile-statement">
        <div className="section-inner">
          <h2 id="smile-statement" className="reveal">
            There&apos;s no better sign of success than your <em>Smile</em>
          </h2>
        </div>
      </section>
      <section className="statement statement-surface" aria-labelledby="surface-statement">
        <div className="section-inner">
          <h2 id="surface-statement">
            <span className="reveal">Dental Care</span>{" "}
            <span className="reveal" style={stagger(1)}>
              that goes deeper
            </span>{" "}
            <span className="reveal" style={stagger(2)}>
              than the <em>surface</em>
            </span>
          </h2>
        </div>
      </section>
    </>
  );
}
