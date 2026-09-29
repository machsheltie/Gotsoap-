// Turns an approved notice into blocks, then into text, markup, or DOM.
// The status line stays ordinary text: no ARIA live region (spec §2.3).
import { NOTICES } from './copy.mjs';

const HEADING = /^(NOTICE OF [A-Z ]+|REFRESH REQUEST DENIED)$/;
// Administrative values that wrap as a whole, never inside (owner review, 2026-09-29).
const KEEP = /(Sub-Section 4|1961-A|41-B|8804-X)/;

export function formatLocal(iso) {
  const d = new Date(iso);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

const kept = (text) => text.split(KEEP).filter(Boolean).map((part) => (KEEP.test(part) ? { text: part, keep: true } : { text: part }));

function segments(line, values) {
  const match = line.match(/\[[a-z ]+\]/);
  if (!match) return kept(line);
  const token = {
    '[generated identifier]': () => ({ text: values.terminalId, keep: true }),
    '[stored local timestamp]': () => ({ text: formatLocal(values.firstContact), datetime: values.firstContact, keep: true }),
    '[current local timestamp]': () => ({ text: formatLocal(values.currentContact), datetime: values.currentContact, keep: true }),
    '[count]': () => ({ text: String(values.count) }),
  }[match[0]]();
  const before = line.slice(0, match.index);
  const after = line.slice(match.index + match[0].length);
  return [...kept(before), token, ...kept(after)];
}

export function blocks(state, values) {
  const out = [];
  let group = [];
  const flush = () => {
    if (group.length === 0) return;
    const heading = group.length === 1 && HEADING.test(group[0][0].text);
    out.push({ tag: heading ? 'h1' : 'p', lines: group });
    group = [];
  };
  for (const line of NOTICES[state]) {
    if (line === '') flush();
    else group.push(segments(line, values));
  }
  flush();
  return out;
}

export function plainText(bs) {
  return bs.map((b) => b.lines.map((segs) => segs.map((s) => s.text).join('')).join('\n')).join('\n\n');
}

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function toHtml(bs) {
  return bs.map((b) => {
    const inner = b.lines.map((segs) => segs.map((s) => {
      const cls = s.keep ? ' class="olc-keep"' : '';
      if (s.datetime) return `<time${cls} datetime="${escape(s.datetime)}">${escape(s.text)}</time>`;
      return s.keep ? `<span${cls}>${escape(s.text)}</span>` : escape(s.text);
    }).join('')).join('<br>');
    return `<${b.tag}>${inner}</${b.tag}>`;
  }).join('\n');
}

export function mount(main, bs) {
  const doc = main.ownerDocument;
  const nodes = bs.map((b) => {
    const el = doc.createElement(b.tag);
    b.lines.forEach((segs, i) => {
      if (i > 0) el.append(doc.createElement('br'));
      for (const s of segs) {
        if (s.datetime || s.keep) {
          const t = doc.createElement(s.datetime ? 'time' : 'span');
          if (s.datetime) t.dateTime = s.datetime;
          if (s.keep) t.className = 'olc-keep';
          t.textContent = s.text;
          el.append(t);
        } else {
          el.append(s.text);
        }
      }
    });
    return el;
  });
  main.replaceChildren(...nodes);
}
