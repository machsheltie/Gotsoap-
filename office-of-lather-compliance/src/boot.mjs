// Runs once, synchronously, right after <main>. On any failure the pre-rendered fallback stays.
import { access, randomHex } from './engine.mjs';
import { blocks, mount } from './render.mjs';

const root = document.documentElement;
try {
  const storage = (name) => { try { return window[name]; } catch { return null; } };
  const result = access({ local: storage('localStorage'), session: storage('sessionStorage'), now: () => new Date(), randomHex });
  if (result.state !== 'fallback') mount(document.querySelector('main'), blocks(result.state, result.values));
} catch {
  // The fallback already in <main> is the truthful answer.
} finally {
  root.classList.remove('olc-resolving');
}
