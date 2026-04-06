import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Admin — StudentDebt.ai', robots: 'noindex' };

interface Subscriber {
  id: string;
  email: string;
  session_id: string | null;
  segment: string | null;
  created_at: string;
}

interface Assessment {
  session_id: string;
  engine_version: string;
  policy_version: string;
  created_at: string;
  result_data: { routingTags?: string[] } | null;
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret || key !== adminSecret) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
        <h1 className="text-lg font-semibold text-gray-900">Access denied</h1>
        <p className="mt-2 text-sm text-gray-500">
          Append <code className="bg-gray-100 px-1 py-0.5 rounded">?key=YOUR_ADMIN_SECRET</code> to the URL.
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Set the <code className="bg-gray-100 px-1 py-0.5 rounded">ADMIN_SECRET</code> environment variable in your deployment.
        </p>
      </div>
    );
  }

  // Load data from Supabase
  let subscribers: Subscriber[] = [];
  let assessments: Assessment[] = [];
  let dbError: string | null = null;

  try {
    const { getSupabaseAdmin } = await import('@/lib/supabase');
    const admin = getSupabaseAdmin();
    const [subResult, assessResult] = await Promise.all([
      admin.from('subscribers').select('*').order('created_at', { ascending: false }).limit(200),
      admin
        .from('assessments')
        .select('session_id, engine_version, policy_version, created_at, result_data')
        .order('created_at', { ascending: false })
        .limit(200),
    ]);
    subscribers = (subResult.data as Subscriber[]) ?? [];
    assessments = (assessResult.data as Assessment[]) ?? [];
    if (subResult.error) dbError = subResult.error.message;
    if (assessResult.error) dbError = assessResult.error.message;
  } catch (err) {
    dbError = err instanceof Error ? err.message : 'Supabase connection failed. Check environment variables.';
  }

  // Routing tag breakdown
  const tagCounts: Record<string, number> = {};
  for (const a of assessments) {
    for (const tag of a.result_data?.routingTags ?? []) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <span className="text-xs text-gray-400">StudentDebt.ai · internal only</span>
      </div>

      {dbError && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <strong>Database error:</strong> {dbError}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <Stat label="Subscribers" value={subscribers.length} />
        <Stat label="Assessments" value={assessments.length} />
        {Object.entries(tagCounts)
          .sort(([, a], [, b]) => b - a)
          .map(([tag, count]) => (
            <Stat key={tag} label={tag.replace(/_/g, ' ')} value={count} />
          ))}
      </div>

      {/* Subscribers */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Subscribers ({subscribers.length})
        </h2>
        {subscribers.length === 0 ? (
          <p className="text-sm text-gray-400">No subscribers yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="border-b text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Segment</th>
                  <th className="px-4 py-3 font-medium">Session</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {subscribers.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{s.email}</td>
                    <td className="px-4 py-3">
                      {s.segment ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          {s.segment.replace(/_/g, ' ')}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-400 font-mono text-xs">
                      {s.session_id ? s.session_id.slice(0, 10) + '…' : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(s.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Recent assessments */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Assessments ({assessments.length})
        </h2>
        {assessments.length === 0 ? (
          <p className="text-sm text-gray-400">No assessments yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="border-b text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">Session</th>
                  <th className="px-4 py-3 font-medium">Routing Tags</th>
                  <th className="px-4 py-3 font-medium">Engine</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {assessments.map((a) => (
                  <tr key={a.session_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">
                      {a.session_id.slice(0, 10)}…
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {(a.result_data?.routingTags ?? []).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
                          >
                            {tag.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{a.engine_version}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(a.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
