import { PageTransition } from "@/components/PageTransition";

/** Re-mounts on every client side navigation, so each page animates in (see PageTransition). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
