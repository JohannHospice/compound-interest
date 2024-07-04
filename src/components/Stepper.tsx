'use client';
import React from 'react';

function Stepper({
  children,
  index,
}: {
  children: React.ReactNode[];
  index: number;
}) {
  if (children.length === 0) {
    return null;
  }

  return children[index];
}
