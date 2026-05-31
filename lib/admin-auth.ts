import 'server-only';

import { createHash, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'portfolio_admin';
const COOKIE_MAX_AGE = 60 * 60 * 8;

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? (process.env.NODE_ENV === 'production' ? '' : 'admin');
}

function getSessionValue() {
  const password = getAdminPassword();
  if (!password) return '';

  return createHash('sha256').update(password).digest('hex');
}

export function isAdminPasswordConfigured() {
  return Boolean(getAdminPassword());
}

export async function verifyAdminPassword(password: string) {
  const expectedPassword = getAdminPassword();
  if (!expectedPassword) return false;

  const expected = Buffer.from(getSessionValue());
  const actual = Buffer.from(createHash('sha256').update(password).digest('hex'));

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  const expected = getSessionValue();

  return Boolean(session && expected && session === expected);
}

export async function setAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, getSessionValue(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
    path: '/admin'
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
