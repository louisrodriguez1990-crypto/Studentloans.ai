export function ReportSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-3/4 rounded bg-gray-200" />
      <div className="space-y-3">
        <div className="h-4 rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-4 w-4/6 rounded bg-gray-200" />
      </div>
      <div className="h-6 w-1/2 rounded bg-gray-200" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 rounded bg-gray-200" style={{ width: `${70 + i * 5}%` }} />
        ))}
      </div>
      <div className="h-6 w-1/3 rounded bg-gray-200" />
      <div className="space-y-2">
        {[1, 2].map((i) => (
          <div key={i} className="h-4 rounded bg-gray-200" style={{ width: `${60 + i * 10}%` }} />
        ))}
      </div>
    </div>
  );
}
