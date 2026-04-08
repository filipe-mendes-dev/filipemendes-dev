import type { NextConfig } from 'next';

const contentSecurityPolicy = `
  default-src 'self';
  base-uri 'self';
  form-action 'self' mailto:;
  frame-ancestors 'none';
  object-src 'none';
  img-src 'self' data: blob: https:;
  font-src 'self' data:;
  style-src 'self' 'unsafe-inline';
  script-src 'self' 'unsafe-inline';
  connect-src 'self' https:;
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, ' ')
  .trim();

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy,
  },
] satisfies NonNullable<Awaited<ReturnType<NonNullable<NextConfig['headers']>>>[number]['headers']>;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
