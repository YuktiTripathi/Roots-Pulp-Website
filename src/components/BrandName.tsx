type BrandNameProps = {
  className?: string;
};

export function BrandName({ className }: BrandNameProps) {
  return (
    <span className={`brand-words${className ? ` ${className}` : ""}`} aria-hidden="true">
      <span className="brand-name">Roots &amp; Pulp</span>
      <span className="brand-descriptor">Dental Clinic</span>
    </span>
  );
}
