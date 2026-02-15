import { describe, it, expect } from 'vitest';
import { cn, truncate, formatDate } from '@/lib/utils';

describe('cn (className merge)', () => {
  it('merges class names', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
  });

  it('handles conditional classes', () => {
    const isActive = false;
    expect(cn('px-2', isActive && 'py-1', 'text-sm')).toBe('px-2 text-sm');
  });

  it('resolves Tailwind conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});

describe('truncate', () => {
  it('truncates long strings', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
  });

  it('returns original if under limit', () => {
    expect(truncate('Hi', 10)).toBe('Hi');
  });
});

describe('formatDate', () => {
  it('formats a date string', () => {
    const result = formatDate('2025-01-15');
    expect(result).toContain('2025');
    expect(result).toContain('Jan');
  });
});
