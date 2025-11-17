import '@testing-library/jest-dom';

import { vi } from 'vitest';

const MockIntersectionObserver = vi.fn();

MockIntersectionObserver.prototype.observe = vi.fn();
MockIntersectionObserver.prototype.unobserve = vi.fn();
MockIntersectionObserver.prototype.disconnect = vi.fn();

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);