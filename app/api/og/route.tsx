import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Your Student Loan Assessment';
  const type = searchParams.get('type') ?? 'default'; // 'article' | 'tool' | 'servicer' | 'default'

  const subtitle =
    type === 'tool'
      ? 'Free Tool — StudentDebt.ai'
      : type === 'article'
        ? 'StudentDebt.ai — 2026 Student Loan Guide'
        : type === 'servicer'
          ? 'StudentDebt.ai — Loan Servicer Guide'
          : 'Free Assessment — StudentDebt.ai';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(135deg, #ecfdf5 0%, #eff6ff 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#10b981',
            }}
          />
          <span style={{ fontSize: '18px', color: '#059669', fontWeight: '600' }}>
            Updated for 2026 policy changes
          </span>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: title.length > 60 ? '44px' : '56px',
              fontWeight: '800',
              color: '#111827',
              lineHeight: '1.1',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: '24px', color: '#6b7280' }}>{subtitle}</div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                background: '#10b981',
                borderRadius: '8px',
                padding: '8px 16px',
                color: 'white',
                fontSize: '18px',
                fontWeight: '700',
              }}
            >
              StudentDebt.ai
            </div>
            <span style={{ fontSize: '16px', color: '#9ca3af' }}>Free · No account required</span>
          </div>
          <div
            style={{
              fontSize: '16px',
              color: '#9ca3af',
            }}
          >
            studentdebt.ai
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
