'use client';
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

function AosInit({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({});
  }, []);
  return <>{children}</>;
}

export default AosInit;
