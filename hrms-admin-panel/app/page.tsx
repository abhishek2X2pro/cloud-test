'use client'

import { redirect } from 'next/navigation';

export default function Page() {
  // Redirect to the main application to avoid conflicts with Vite/React Router setup
  redirect('/');
}
