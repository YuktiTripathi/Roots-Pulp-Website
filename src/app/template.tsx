/**
 * Re-mounts on every client-side navigation, so each page settles in with a short, subtle fade.
 * The animation starts at 75% opacity and has no fill-forwards, so it never delays content
 * and leaves no transform behind that could affect sticky or fixed children.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
