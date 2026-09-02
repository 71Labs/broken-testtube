export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-medium tracking-tight text-ink text-balance">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-grey">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
