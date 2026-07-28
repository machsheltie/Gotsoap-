import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const IVR_SHA256 = '7748CEFCED4D671E57ACA64D4BA3852C693C068B89A982E2365E4FC3D6AF1AB0';

export function compareRawDocuments(left, right) {
  return Buffer.isBuffer(left) && Buffer.isBuffer(right) && left.equals(right)
    ? []
    : ['Portable pledge contracts do not match exactly as raw bytes.'];
}

export function findForbiddenAuthorityPhrases(text, path) {
  const forbidden = [
    'there is no application code yet',
    'site is currently empty',
    'netlify forms in v1',
    "cwaaa's site-within-a-site",
  ];
  const lower = text.toLowerCase();
  return forbidden
    .filter((phrase) => lower.includes(phrase))
    .map((phrase) => `${path}: forbidden stale authority phrase "${phrase}"`);
}

export function missingRequiredMarkers(text, markers, path = 'document') {
  const upper = text.toUpperCase();
  return markers
    .filter((marker) => !upper.includes(marker.toUpperCase()))
    .map((marker) => `${path}: missing required marker "${marker}"`);
}

function protectedUnresolvedContext(line) {
  const assertionStart = line.search(
    /\b(?:CWAAA|Office(?: of Lather Compliance)?)\b|Got Soap\?/i,
  );
  const context = assertionStart === -1 ? line : line.slice(0, assertionStart);
  return /\b(?:whether|intentionally unresolved|unresolved possibility|may wonder|allowed to wonder|does not|do not|never|must not|cannot|can't|no artifact|question)\b/i.test(context);
}

const documentedSpanIntroPattern =
  /\b(?:rejected|forbidden|historical|archived|superseded|quoted)(?:\s*\/\s*(?:rejected|forbidden|historical|archived|superseded|quoted))*\s+(?:wording|example|quotation|quote|draft|phrase)\s*:?\s*$/i;
const namedSpanIntroPattern =
  /\b(?:the|this|that)\s+(?:wording|example|quotation|quote|draft|phrase)\s*:?\s*$/i;
const documentedSpanPredicatePattern =
  /^\s*(?:is|was)\s+(?:(?:explicitly\s+)?(?:rejected|forbidden|historical|archived|superseded)\b|quoted\b[\s\S]*\b(?:rejected|forbidden|historical|archived|superseded|example|quotation)\b)/i;
const documentedCopularSpanIntroPattern =
  /\b(?:the\s+)?(?:rejected|forbidden|historical|archived|superseded|quoted)(?:\s*\/\s*(?:rejected|forbidden|historical|archived|superseded|quoted))*\s+(?:wording|example|quotation|quote|draft|phrase)\s+(?:is|was)\s*$/i;
const namedCopularSpanIntroPattern =
  /\b(?:the|this|that)\s+(?:wording|example|quotation|quote|draft|phrase)\s+(?:is|was)\s*$/i;
const postCopularDocumentationPattern =
  /^\s*(?:and\s+)?(?:is|was)\s+(?:explicitly\s+)?(?:rejected|forbidden|historical|archived|superseded)\b/i;

function isDocumentedInlineSpan(prefix, suffix) {
  return documentedSpanIntroPattern.test(prefix)
    || documentedCopularSpanIntroPattern.test(prefix)
    || (namedSpanIntroPattern.test(prefix) && documentedSpanPredicatePattern.test(suffix))
    || (
      namedCopularSpanIntroPattern.test(prefix)
      && postCopularDocumentationPattern.test(suffix)
    );
}

function isEscapedDelimiter(text, index) {
  let slashCount = 0;
  for (let cursor = index - 1; cursor >= 0 && text[cursor] === '\\'; cursor -= 1) {
    slashCount += 1;
  }
  return slashCount % 2 === 1;
}

function textAuthorityToken(text, index) {
  return {
    kind: 'text',
    raw: text[index],
    content: text[index],
    start: index,
    end: index + 1,
  };
}

function invalidSpanToken(text, index, delimiter) {
  return {
    kind: 'span',
    delimiter,
    raw: text[index],
    content: '',
    start: index,
    end: index + 1,
    balanced: false,
    valid: false,
  };
}

function validSpanToken(text, start, end, delimiter) {
  return {
    kind: 'span',
    delimiter,
    raw: text.slice(start, end),
    content: text.slice(start + 1, end - 1),
    start,
    end,
    balanced: true,
    valid: true,
  };
}

export function lexInlineAuthorityTokens(text) {
  const tokens = [];

  for (let index = 0; index < text.length;) {
    const character = text[index];
    const stylingDelimiter = /["`“”]/.test(character);
    if (stylingDelimiter && isEscapedDelimiter(text, index)) {
      tokens.push(textAuthorityToken(text, index));
      index += 1;
      continue;
    }

    const delimiter = character === '“' || character === '”'
      ? 'curly'
      : character === '"'
        ? 'ascii'
        : character === '`'
          ? 'backtick'
          : null;
    if (!delimiter) {
      tokens.push(textAuthorityToken(text, index));
      index += 1;
      continue;
    }

    if (character === '”') {
      tokens.push(invalidSpanToken(text, index, delimiter));
      index += 1;
      continue;
    }

    const closer = character === '“' ? '”' : character;
    let closerIndex = -1;
    let nestedCurlyOpener = false;
    for (let cursor = index + 1; cursor < text.length; cursor += 1) {
      if (character === '“' && text[cursor] === '“') {
        nestedCurlyOpener = true;
        break;
      }
      if (text[cursor] === closer && (
        closer === '”' || !isEscapedDelimiter(text, cursor)
      )) {
        closerIndex = cursor;
        break;
      }
    }

    if (nestedCurlyOpener || closerIndex === -1) {
      tokens.push(invalidSpanToken(text, index, delimiter));
      index += 1;
      continue;
    }

    const end = closerIndex + 1;
    tokens.push(validSpanToken(text, index, end, delimiter));
    index = end;
  }

  return tokens;
}

function tokenText(tokens, field = 'raw') {
  return tokens.map((token) => token[field]).join('');
}

const authorityStylingDelimiterPattern = /^["`“”]$/;
const documentedListIntroPattern =
  /^\s*(?:rejected|forbidden|historical|archived|superseded)\s+(?:examples|phrases|wording|quotations)\s*:\s*$/i;
const documentedListConnectorPattern =
  /^\s*(?:(?:[,;:—–-]\s*)?(?:and|or)|[,;:—–-])\s*$/i;
const documentedListTailPattern =
  /^\s*(?:[.,;:!?—–-]\s*)*(?:(?:and\s+)?(?:(?:(?:these|the)\s+)?(?:examples|phrases|wording|quotations)\s+)?(?:are|were|remain)\s+(?:explicitly\s+)?(?:rejected|forbidden|historical|archived|superseded|quoted)\s*[.!?]?)?\s*$/i;

function isStrictDocumentedSpanList(tokens, delimiter) {
  const spans = tokens
    .map((token, index) => ({ token, index }))
    .filter(({ token }) => token.kind === 'span' && token.delimiter === delimiter);
  if (
    spans.length < 2
    || spans.some(({ token }) => !token.balanced || !token.valid)
  ) {
    return false;
  }

  const prefix = tokenText(tokens.slice(0, spans[0].index));
  if (!documentedListIntroPattern.test(prefix)) return false;

  for (let index = 1; index < spans.length; index += 1) {
    const interstitial = tokenText(tokens.slice(
      spans[index - 1].index + 1,
      spans[index].index,
    ));
    if (!documentedListConnectorPattern.test(interstitial)) return false;
  }

  const tail = tokenText(tokens.slice(spans.at(-1).index + 1));
  return documentedListTailPattern.test(tail);
}

function isAuthorityStylingBoundary(token) {
  return (
    token?.kind === 'span'
  ) || (
    token?.kind === 'text' && authorityStylingDelimiterPattern.test(token.raw)
  );
}

function normalizeAuthoritySemanticToken(tokens, index) {
  const token = tokens[index];
  if (token.kind === 'span') {
    return token.content.replace(/^\\+|\\+$/g, '');
  }

  if (authorityStylingDelimiterPattern.test(token.raw)) return '';
  if (token.raw !== '\\') return token.raw;

  let before = index - 1;
  while (
    before >= 0
    && tokens[before].kind === 'text'
    && tokens[before].raw === '\\'
    && tokens[before].end === tokens[before + 1].start
  ) {
    before -= 1;
  }

  let after = index + 1;
  while (
    after < tokens.length
    && tokens[after].kind === 'text'
    && tokens[after].raw === '\\'
    && tokens[after - 1].end === tokens[after].start
  ) {
    after += 1;
  }

  const adjacentToStyling = (
    before >= 0
    && tokens[before].end === tokens[before + 1].start
    && isAuthorityStylingBoundary(tokens[before])
  ) || (
    after < tokens.length
    && tokens[after - 1].end === tokens[after].start
    && isAuthorityStylingBoundary(tokens[after])
  );
  return adjacentToStyling ? '' : token.raw;
}

function isDocumentedListContinuation(text, tokens, index, clauseTokens) {
  const spans = clauseTokens.filter(({ kind }) => kind === 'span');
  if (
    spans.length === 0
    || spans.some(({ balanced, valid }) => !balanced || !valid)
    || new Set(spans.map(({ delimiter }) => delimiter)).size !== 1
  ) {
    return false;
  }

  const firstSpanIndex = clauseTokens.findIndex(({ kind }) => kind === 'span');
  const listIntro = tokenText(clauseTokens.slice(0, firstSpanIndex));
  if (!documentedListIntroPattern.test(listIntro)) {
    return false;
  }

  const token = tokens[index];
  const connector = token.raw === ','
    ? text.slice(token.start).match(/^,\s+(?:and|or)\s+/i)
    : text.slice(token.start).match(/^;\s*(?:(?:and|or)\s+)?/i);
  if (!connector) return false;

  const nextPosition = token.start + connector[0].length;
  let nextIndex = index + 1;
  while (nextIndex < tokens.length && tokens[nextIndex].start < nextPosition) {
    nextIndex += 1;
  }

  const next = tokens[nextIndex];
  return next?.kind === 'span'
    && next.valid
    && next.delimiter === spans[0].delimiter;
}

function splitSemanticTokens(text, tokens) {
  const clauses = [];
  let clauseTokens = [];
  let clauseRaw = '';

  const emitClause = () => {
    if (clauseRaw.trim()) clauses.push(clauseTokens);
    clauseTokens = [];
    clauseRaw = '';
  };

  const skipTokensBefore = (index, position) => {
    let next = index;
    while (next < tokens.length && tokens[next].start < position) next += 1;
    return next;
  };

  for (let index = 0; index < tokens.length;) {
    const token = tokens[index];
    if (token.kind === 'span' && token.valid) {
      clauseTokens.push(token);
      clauseRaw += token.raw;
      index += 1;
      continue;
    }

    const commaConjunction = token.kind === 'text' && token.raw === ','
      ? text.slice(token.start).match(/^,\s+(?:and|but|yet|while)\s+/i)
      : null;
    const documentedListContinuation = (
      (commaConjunction || (token.kind === 'text' && token.raw === ';'))
      && isDocumentedListContinuation(text, tokens, index, clauseTokens)
    );
    if (commaConjunction && !documentedListContinuation) {
      emitClause();
      index = skipTokensBefore(index, token.start + commaConjunction[0].length);
      continue;
    }

    if (
      token.kind === 'text'
      && token.raw === ';'
      && !documentedListContinuation
    ) {
      emitClause();
      let nextPosition = token.end;
      while (/\s/.test(text[nextPosition] ?? '')) nextPosition += 1;
      index = skipTokensBefore(index, nextPosition);
      continue;
    }

    clauseTokens.push(token);
    clauseRaw += token.raw;
    index += 1;

    const sentenceBoundary = token.kind === 'text'
      && /[.!?]/.test(token.raw)
      && /\s/.test(text[token.end] ?? '')
      && !(token.raw === '?' && clauseRaw.trimEnd().endsWith('Got Soap?'));
    if (sentenceBoundary) {
      emitClause();
      let nextPosition = token.end;
      while (/\s/.test(text[nextPosition] ?? '')) nextPosition += 1;
      index = skipTokensBefore(index, nextPosition);
    }
  }

  emitClause();
  return clauses;
}

export function normalizeAuthorityClause(tokens) {
  const rawClause = tokenText(tokens);
  const spansByDelimiter = new Map();
  for (const token of tokens) {
    if (token.kind !== 'span') continue;
    const spans = spansByDelimiter.get(token.delimiter) ?? [];
    spans.push(token);
    spansByDelimiter.set(token.delimiter, spans);
  }

  const documentedListDelimiters = new Set(
    [...spansByDelimiter.keys()]
      .filter((delimiter) => isStrictDocumentedSpanList(tokens, delimiter)),
  );
  let normalized = '';
  let offset = 0;
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token.kind === 'text') {
      normalized += normalizeAuthoritySemanticToken(tokens, index);
      offset += token.raw.length;
      continue;
    }

    const sameDelimiterSpans = spansByDelimiter.get(token.delimiter) ?? [];
    const soleValidSpan = sameDelimiterSpans.length === 1
      && token.balanced
      && token.valid;
    const prefix = rawClause.slice(0, offset);
    const suffix = rawClause.slice(offset + token.raw.length);
    const documentedSpan = (
      soleValidSpan && isDocumentedInlineSpan(prefix, suffix)
    ) || documentedListDelimiters.has(token.delimiter);
    normalized += documentedSpan
      ? ' '
      : normalizeAuthoritySemanticToken(tokens, index);
    offset += token.raw.length;
  }

  return normalized.trim();
}

function semanticClauses(text) {
  const assertionText = text
    .split(/\r?\n/)
    .filter((line) => !/^\s*>/.test(line))
    .join('\n');

  return assertionText
    .split(/\r?\n\s*\r?\n/)
    .flatMap((paragraph) => {
      const prose = paragraph.replace(/\r?\n/g, ' ');
      const tokens = lexInlineAuthorityTokens(prose);
      return splitSemanticTokens(prose, tokens).map(normalizeAuthorityClause);
    });
}

function matchingLines(text, pattern) {
  return semanticClauses(text).filter((line) => pattern.test(line));
}

function matchingChronologyClauses(text, pattern) {
  return semanticClauses(text)
    .map((line) => line.replace(/\bnot\s+(?:in\s+)?(?:1961|2024)\b/gi, ' '))
    .filter((line) => pattern.test(line));
}

export function validatePathAwareCanon(path, text) {
  const errors = [];
  const lowerPath = path.toLowerCase().replaceAll('\\', '/');

  const isCwaaa = /\bCWAAA\b/i.test(text) || lowerPath.includes('/cwaaa/');
  const isGotSoap = /Got Soap\?/i.test(text)
    || lowerPath.includes('/gotsoap/')
    || lowerPath.endsWith('/prd/prd-gotsoap-web-v1.md')
    || lowerPath === 'docs/design.md';
  const isOffice = /\b(?:The\s+)?Office(?: of Lather Compliance)?\b/i.test(text)
    || lowerPath.includes('/office-of-lather-compliance/');

  if (isCwaaa) {
    const cwaaa1961 = /(?:\bCWAAA\b[^.\n]{0,100}\b(?:was\s+)?(?:established|founded|formed|has existed since|dates? to)\b[^.\n]{0,30}\b1961\b|\b1961\b[^.\n]{0,80}\bCWAAA\b[^.\n]{0,50}\b(?:was\s+)?(?:established|founded|formed)\b)/i;
    const cwaaaMarkerAssigns1961 = lowerPath.includes('/cwaaa/')
      && /\*\*Established:\*\*\s*1961\b/i.test(text);
    if (cwaaaMarkerAssigns1961 || matchingChronologyClauses(text, cwaaa1961)
      .some((line) => !protectedUnresolvedContext(line))) {
      errors.push(`${path}: CWAAA chronology must not assign 1961 to CWAAA.`);
    }
    for (const line of matchingLines(text, /\bCWAAA\s+(?:campaigns?|regulates?|claims?\s+jurisdiction|assumes?\s+jurisdiction)\b/i)) {
      if (protectedUnresolvedContext(line)) continue;
      if (/\bCWAAA\s+campaigns?\b/i.test(line)) {
        errors.push(`${path}: CWAAA must not campaign; Got Soap? owns campaign authorship.`);
      }
      if (/\bCWAAA\s+regulates?\b/i.test(line)) {
        errors.push(`${path}: CWAAA must not regulate; the Office owns regulation.`);
      }
      if (/\bCWAAA\s+(?:claims?|assumes?)\s+jurisdiction\b/i.test(line)) {
        errors.push(`${path}: CWAAA must not claim jurisdiction.`);
      }
    }
  }

  if (isGotSoap) {
    for (const line of matchingLines(text, /\bGot Soap\?\s+(?:regulates?|files?\s+findings)\b/i)) {
      if (protectedUnresolvedContext(line)) continue;
      if (/\bGot Soap\?\s+regulates?\b/i.test(line)) {
        errors.push(`${path}: Got Soap? must not regulate.`);
      }
      if (/\bGot Soap\?\s+files?\s+findings\b/i.test(line)) {
        errors.push(`${path}: Got Soap? must not file findings.`);
      }
    }
  }

  if (isOffice) {
    const office2024 = /(?:\b(?:The\s+)?Office(?: of Lather Compliance)?\b[^.\n]{0,100}\b(?:was\s+)?(?:established|founded|formed|has existed since|dates? to)\b[^.\n]{0,30}\b2024\b|\b2024\b[^.\n]{0,80}\b(?:the\s+)?Office(?: of Lather Compliance)?\b[^.\n]{0,50}\b(?:was\s+)?(?:established|founded|formed)\b)/i;
    const officeMarkerAssigns2024 = lowerPath.includes('/office-of-lather-compliance/')
      && /\*\*Established:\*\*\s*2024\b/i.test(text);
    if (officeMarkerAssigns2024 || matchingChronologyClauses(text, office2024)
      .some((line) => !protectedUnresolvedContext(line))) {
      errors.push(`${path}: Office chronology must not assign 2024 to the Office.`);
    }
    for (const line of matchingLines(
      text,
      /\b(?:The\s+)?Office(?: of Lather Compliance)?\s+(?:campaigns?|owns?|files?|receives?|records?|enforces?|processes?)\b/i,
    )) {
      if (protectedUnresolvedContext(line)) continue;
      if (/\bOffice(?: of Lather Compliance)?\s+campaigns?\b/i.test(line)) {
        errors.push(`${path}: Office must not campaign.`);
      }
      if (/\bOffice(?: of Lather Compliance)?\s+owns?\s+(?:the\s+)?(?:Lather\s+)?Pledge\b/i.test(line)) {
        errors.push(`${path}: Office must not own the pledge.`);
      }
      if (/\bOffice(?: of Lather Compliance)?\s+(?:files?|receives?|records?|enforces?|processes?)\s+(?:the\s+)?(?:Lather\s+)?Pledge\b/i.test(line)) {
        errors.push(`${path}: Office must not file the pledge or control its data.`);
      }
    }
  }

  const relationshipDenialPatterns = [
    /\b(?:The\s+)?Office(?: of Lather Compliance)?\s+is not\s+(?:an?\s+)?technical service operated by\s+CWAAA\b/i,
    /\bCWAAA\s+does not operate\s+(?:the\s+)?Office(?: of Lather Compliance)?\b/i,
  ];
  for (const line of semanticClauses(text)) {
    if (protectedUnresolvedContext(line)) continue;
    if (relationshipDenialPatterns.some((pattern) => pattern.test(line))) {
      errors.push(`${path}: over-resolves protected CWAAA/Office ambiguity via "operational separation".`);
    }
  }

  const relationshipPatterns = [
    /\bCWAAA\s+is\s+(?:the\s+)?Office(?: of Lather Compliance)?(?:['’]s)?\s+(?:partner|operator|coordinator)\b/i,
    /\bCWAAA\s+is\s+(?:a\s+|the\s+)?(?:partner|operator|coordinator)\s+(?:of|for|with)\s+(?:the\s+)?Office(?: of Lather Compliance)?\b/i,
    /\bCWAAA\s+is\s+(?:overseen|controlled|operated)\s+by\s+(?:the\s+)?Office(?: of Lather Compliance)?\b/i,
    /\bCWAAA\s+works?\s+(?:in coordination with|on behalf of)\s+(?:the\s+)?Office(?: of Lather Compliance)?\b/i,
    /\b(?:The\s+)?Office(?: of Lather Compliance)?\s+(?:operates?|controls?|oversees?)\s+CWAAA\b/i,
    /\b(?:The\s+)?Office(?: of Lather Compliance)?\s+(?:operates?|acts?)\s+through\s+CWAAA\b/i,
    /\bCWAAA\s+(?:is|serves as|functions as|acts as)\s+(?:an?\s+|the\s+)?(?:Office(?: of Lather Compliance)?(?:['’]s)?\s+)?(?:public-facing\s+(?:layer|front)|front|division|parent(?:\s+(?:agency|organization))?)/i,
    /\bCWAAA\s+(?:fronts for|is operated by|is a division of|is the parent of)\s+(?:the\s+)?Office\b/i,
    /\b(?:The\s+)?Office(?: of Lather Compliance)?\s+(?:operates|uses|controls)\s+CWAAA\s+as\s+(?:its\s+)?(?:public-facing\s+layer|front|division)/i,
    /\bCWAAA\s+(?:operates?|acts?\s+through)\s+(?:the\s+)?Office(?: of Lather Compliance)?\b/i,
    /\bCWAAA\s+provides?\s+technical services?\s+to\s+(?:the\s+)?Office(?: of Lather Compliance)?\b/i,
    /\b(?:The\s+)?Office(?: of Lather Compliance)?\s+(?:is\s+(?:an?\s+)?division of|is operated by|acts?\s+through)\s+CWAAA\b/i,
    /\b(?:The\s+)?Office(?: of Lather Compliance)?\s+is\s+(?:an?\s+)?technical service operated by\s+CWAAA\b/i,
  ];
  for (const line of semanticClauses(text)) {
    if (protectedUnresolvedContext(line)) continue;
    const match = relationshipPatterns.map((pattern) => line.match(pattern)).find(Boolean);
    if (match) {
      const label = /public-facing layer/i.test(match[0])
        ? 'public-facing layer'
        : /operates?\s+through/i.test(match[0])
          ? 'operates through'
          : /\bpartner\b/i.test(match[0])
            ? 'partner'
            : /\boverseen\b/i.test(match[0])
              ? 'overseen'
              : /\bcoordination\b|\bcoordinator\b/i.test(match[0])
                ? 'coordination'
                : /\bbehalf\b/i.test(match[0])
                  ? 'on behalf'
                  : /\bcontrolled\b|\bcontrols?\b/i.test(match[0])
                    ? 'controlled'
                    : /front/i.test(match[0])
                      ? 'front'
                      : /division/i.test(match[0])
                        ? 'division'
                        : /technical service/i.test(match[0])
                          ? 'technical services'
                          : /operat/i.test(match[0])
                            ? 'operates'
                            : /acts?\s+through/i.test(match[0])
                              ? 'operational channel'
                              : 'parent';
      errors.push(`${path}: relationship mystery must not resolve the CWAAA/Office relationship as "${label}".`);
    }
  }

  const overResolvingRules = [
    {
      paths: ['/cwaaa/world-bible.md'],
      pattern: /\bnever\s+(?:a\s+regulator,\s+law-enforcement body,\s+or\s+)?a\s+government front\b/i,
      label: 'government front',
    },
    {
      paths: ['/cwaaa/world-bible.md'],
      pattern: /\bCWAAA\b[\s\S]{0,120}\bdoes not know\b[\s\S]{0,120}\b(?:Office|its)\s+internal systems\b/i,
      label: 'Office internal systems',
    },
    {
      paths: ['/cwaaa/readme.md', '/office-of-lather-compliance/readme.md'],
      pattern: /\bCWAAA\b[^.]{0,100}\bdoes not contain or operate\b/i,
      label: 'contain or operate',
    },
    {
      paths: ['agents.md'],
      pattern: /\b(?:CWAAA|It)\s+never\s+contains,\s+operates,\s+or\s+impersonates\s+the\s+Office\b/i,
      label: 'impersonates the Office',
    },
    {
      paths: ['/office-of-lather-compliance/world-bible.md'],
      pattern: /\b(?:The Office|It)\s+never[^.\n]{0,100}\bdispatches an assessor\b/i,
      label: 'dispatches an assessor',
    },
    {
      paths: ['/handoff.md'],
      pattern: /\b(?:CWAAA|It)\b[^.]{0,80}\bneither contains nor operates\b/i,
      label: 'neither contains nor operates',
    },
  ];
  for (const { paths, pattern, label } of overResolvingRules) {
    if (paths.some((suffix) => lowerPath.endsWith(suffix)) && pattern.test(text)) {
      errors.push(`${path}: over-resolves protected CWAAA/Office ambiguity via "${label}".`);
    }
  }

  if (lowerPath.endsWith('/cwaaa/design.md')) {
    if (matchingLines(text, /\bPrimary stock:\s*paper-manila\b/i).length > 0) {
      errors.push(`${path}: obsolete CWAAA paper-universe guidance.`);
    }
    if (matchingLines(text, /\bsite behaves like a records room with index logic\b/i).length > 0) {
      errors.push(`${path}: obsolete CWAAA records-room guidance.`);
    }
    if (matchingLines(text, /\bAvoid a photo-led hero\b/i).length > 0) {
      errors.push(`${path}: obsolete CWAAA hero guidance.`);
    }
  }

  if (lowerPath.endsWith('/cwaaa/prd-cwaaa-web-v1.md')
    && matchingLines(text, /\|\s*\/case-files\s*\|\s*Public case-file index\s*\|/i).length > 0) {
    errors.push(`${path}: obsolete CWAAA public route.`);
  }

  if (lowerPath.endsWith('/1-800-got-soap-ivr-authority.md')) {
    if (matchingLines(text, /(?:\b(?:There is|The call (?:has|uses|includes))\s+(?:a\s+)?third Office voice\b|\bA third Office voice\b|\bThe call has (?:three|3) presented voices\b|\bVoice C\s+is\s+(?:the\s+)?Office representative\b)/i)
      .some((line) => !protectedUnresolvedContext(line))) {
      errors.push(`${path}: IVR authority must not add a third Office voice; retain two presented voices and no Voice C Office representative.`);
    }
    if (matchingLines(text, /(?:\b(?:There is|The caller hears)\s+an audible (?:transfer|handoff)\b|\bVoice [AB]\s+audibly transfers?\b|\bAn audible handoff transfers the caller to (?:the\s+)?Office\b)/i)
      .some((line) => !protectedUnresolvedContext(line))) {
      errors.push(`${path}: IVR authority must not add an audible transfer.`);
    }
  }

  return errors;
}

export function validateIvrIntegrity(bytes) {
  if (bytes === null) return ['IVR integrity error: canonical PDF is missing.'];
  if (!Buffer.isBuffer(bytes) || bytes.length === 0) {
    return ['IVR integrity error: canonical PDF is empty.'];
  }
  const actual = createHash('sha256').update(bytes).digest('hex').toUpperCase();
  return actual === IVR_SHA256
    ? []
    : [`IVR integrity error: canonical PDF SHA-256 ${actual} does not match ${IVR_SHA256}.`];
}

export function validateOfficeStateContract(contract) {
  const errors = [];
  const expectedStateSelectionOrder = [
    'continued_interest',
    'same_session_refresh',
    'later_return',
    'first_access',
  ];
  const expectedStateIds = [
    'first_access',
    'same_session_refresh',
    'later_return',
    'continued_interest',
  ];
  const expectedStateSemantics = {
    first_access: {
      condition: 'no persistent record',
      effect: 'create persistent and session records; set returnSessionCount to 0, lifetimeAccessCount to 1, and sessionRefreshCount to 0',
    },
    same_session_refresh: {
      condition: 'session marker existed at access start and returnSessionCount is below 2',
      effect: 'increment sessionRefreshCount and lifetimeAccessCount; never increment returnSessionCount',
    },
    later_return: {
      condition: 'new-session transition ran and post-transition returnSessionCount is exactly 1',
      effect: 'show first and current timestamps after the new-session transition creates the session record',
    },
    continued_interest: {
      condition: 'post-transition returnSessionCount is 2 or greater',
      effect: 'remain in Continued Interest stasis on all later accesses',
    },
  };
  const expectedFallback = {
    storageUnavailable: 'render a neutral inaccessible-resource state without claiming recognition',
  };
  const expectedForbidden = [
    'ordinary homepage',
    'site navigation',
    'agency explainer',
    'named federal, state, or local jurisdiction',
    'IP address display',
    'backend identity record',
    'cross-device recognition',
    'reload-driven escalation',
    'infinite escalation',
  ];
  const stateById = Object.fromEntries(
    (contract.states ?? []).map((state) => [state.id, state]),
  );
  const storage = contract.storage ?? {};
  const terminalIdentity = contract.terminalIdentity ?? {};
  const firstAccessTransition = contract.firstAccessTransition ?? {};
  const newSessionTransition = contract.newSessionTransition ?? {};
  const sameSessionTransition = contract.sameSessionTransition ?? {};

  if (contract.thresholds?.continuedInterestSession !== 3) {
    errors.push('Continued Interest must begin on the third distinct browser session.');
  }
  if (!contract.sessionRecord?.sessionRefreshCount) {
    errors.push('Office contract must define sessionRefreshCount.');
  }
  if (!contract.persistentRecord?.returnSessionCount) {
    errors.push('Office contract must define returnSessionCount.');
  }
  if (!contract.persistentRecord?.lifetimeAccessCount) {
    errors.push('Office contract must define lifetimeAccessCount.');
  }
  if (contract.referenceMeaning !== 'standing containment reference') {
    errors.push('8804-X must be a standing containment reference.');
  }
  if (contract.persistentRecord?.reference !== '8804-X') {
    errors.push('Office contract must retain standing containment reference 8804-X.');
  }
  if (storage.session !== 'sessionStorage') {
    errors.push('Office storage.session must be sessionStorage.');
  }
  if (storage.persistent !== 'localStorage') {
    errors.push('Office storage.persistent must be localStorage.');
  }
  if (storage.namespace !== 'olc.visit.v1') {
    errors.push('Office storage namespace must be olc.visit.v1.');
  }
  if (storage.cookies !== false) {
    errors.push('Office storage cookies must remain false.');
  }
  if (storage.ipAddress !== false) {
    errors.push('Office storage ipAddress must remain false.');
  }
  if (storage.fingerprinting !== false) {
    errors.push('Office storage fingerprinting must remain false.');
  }
  if (storage.serverPersistence !== false) {
    errors.push('Office storage serverPersistence must remain false.');
  }
  if (contract.rendering?.resolveBeforeReveal !== true) {
    errors.push('Office rendering resolveBeforeReveal must remain true.');
  }
  if (contract.rendering?.returningBrowserMayFlashFirstAccess !== false) {
    errors.push('Office rendering returningBrowserMayFlashFirstAccess must remain false.');
  }
  if (
    terminalIdentity.scope !== 'browser-local'
    || terminalIdentity.source !== 'locally generated fictional browser identifier'
    || terminalIdentity.fingerprinting !== false
  ) {
    errors.push('Office terminal identity must remain browser-local and fingerprint-free.');
  }
  if (
    contract.stateSelectionContext?.captureSessionMarkerBeforeTransition !== true
    || contract.stateSelectionContext?.newSession !== 'session marker was absent at start of access'
  ) {
    errors.push('Office state selection must capture new-session status before transition.');
  }
  if (firstAccessTransition.requiresPersistentRecordAbsent !== true) {
    errors.push('Office first access must require an absent persistent record.');
  }
  if (firstAccessTransition.skipsNewSessionTransition !== true) {
    errors.push('Office first access must skip the new-session transition.');
  }
  if (firstAccessTransition.persistentRecord?.operation !== 'create') {
    errors.push('Office first access must create the persistent record.');
  }
  if (firstAccessTransition.persistentRecord?.returnSessionCount !== 0) {
    errors.push('Office first access must initialize returnSessionCount to 0.');
  }
  if (firstAccessTransition.persistentRecord?.lifetimeAccessCount !== 1) {
    errors.push('Office first access must initialize lifetimeAccessCount to 1.');
  }
  if (firstAccessTransition.sessionRecord?.operation !== 'create') {
    errors.push('Office first access must create the session record.');
  }
  if (firstAccessTransition.sessionRecord?.sessionRefreshCount !== 0) {
    errors.push('Office first access must initialize sessionRefreshCount to 0.');
  }
  if (newSessionTransition.beforeStateSelection !== true) {
    errors.push('Office new-session transition must run before pre-selection state resolution.');
  }
  if (newSessionTransition.requiresPersistentRecord !== true) {
    errors.push('Office new-session transition must require a persistent record.');
  }
  if (newSessionTransition.requiresSessionMarkerAbsentAtAccessStart !== true) {
    errors.push('Office new-session transition must require an absent session marker at access start.');
  }
  if (newSessionTransition.literalFirstAccessSkipsTransition !== true) {
    errors.push('Office literal first access must skip the new-session transition.');
  }
  if (newSessionTransition.returnSessionCount?.operation !== 'increment') {
    errors.push('Office new-session returnSessionCount operation must be increment.');
  }
  if (newSessionTransition.returnSessionCount?.amount !== 1) {
    errors.push('Office new-session returnSessionCount amount must be 1.');
  }
  if (newSessionTransition.returnSessionCount?.oncePerNewSession !== true) {
    errors.push('Office returnSessionCount must increment once per new session.');
  }
  if (newSessionTransition.lifetimeAccessCount?.operation !== 'increment') {
    errors.push('Office new-session lifetimeAccessCount operation must be increment.');
  }
  if (newSessionTransition.lifetimeAccessCount?.amount !== 1) {
    errors.push('Office new-session lifetimeAccessCount amount must be 1.');
  }
  if (newSessionTransition.sessionRecord?.operation !== 'create') {
    errors.push('Office new-session transition must create a fresh session record.');
  }
  if (newSessionTransition.sessionRecord?.sessionRefreshCount !== 0) {
    errors.push('Office new-session sessionRefreshCount must initialize to 0.');
  }
  if (sameSessionTransition.returnSessionCount?.operation !== 'preserve') {
    errors.push('Office same-session returnSessionCount operation must be preserve.');
  }
  if (sameSessionTransition.returnSessionCount?.increment !== false) {
    errors.push('Office same-session returnSessionCount increment must remain false.');
  }
  if (sameSessionTransition.sessionRefreshCount?.operation !== 'increment') {
    errors.push('Office same-session sessionRefreshCount operation must be increment.');
  }
  if (sameSessionTransition.sessionRefreshCount?.amount !== 1) {
    errors.push('Office same-session sessionRefreshCount amount must be 1.');
  }
  if (sameSessionTransition.lifetimeAccessCount?.operation !== 'increment') {
    errors.push('Office same-session lifetimeAccessCount operation must be increment.');
  }
  if (sameSessionTransition.lifetimeAccessCount?.amount !== 1) {
    errors.push('Office same-session lifetimeAccessCount amount must be 1.');
  }
  if (
    JSON.stringify(contract.stateSelectionOrder) !== JSON.stringify(expectedStateSelectionOrder)
  ) {
    errors.push('Office state selection must prioritize Continued Interest, refresh, later return, then first access.');
  }
  if (
    JSON.stringify(contract.states?.map((state) => state.id)) !== JSON.stringify(expectedStateIds)
  ) {
    errors.push('Office contract must retain the four-state session progression.');
  }
  if (
    stateById.first_access?.selection?.persistentRecordExists !== false
    || stateById.same_session_refresh?.selection?.sessionMarkerExistedAtAccessStart !== true
    || stateById.same_session_refresh?.selection?.maximumReturnSessionCount !== 1
    || stateById.later_return?.selection?.newSession !== true
    || stateById.later_return?.selection?.postTransitionReturnSessionCount !== 1
    || stateById.continued_interest?.selection?.postTransitionReturnSessionCount?.minimum !== 2
  ) {
    errors.push('Office state selectors must use post-transition session counts deterministically.');
  }
  for (const [stateId, expected] of Object.entries(expectedStateSemantics)) {
    if (stateById[stateId]?.condition !== expected.condition) {
      errors.push(`Office ${stateId} condition must remain exact.`);
    }
    if (stateById[stateId]?.effect !== expected.effect) {
      errors.push(`Office ${stateId} effect must remain exact.`);
    }
  }
  if (JSON.stringify(contract.fallback) !== JSON.stringify(expectedFallback)) {
    errors.push('Office fallback object must remain exact and must not claim recognition.');
  }
  if (JSON.stringify(contract.forbidden) !== JSON.stringify(expectedForbidden)) {
    errors.push('Office forbidden rules must remain exact, including reload-driven escalation.');
  }
  return errors;
}

export function validatePledgeContract(contract) {
  const errors = [];
  const fulfillment = contract.fulfillment ?? {};
  const messages = fulfillment.messages ?? [];
  const receipt = messages[0] ?? {};
  const currentIssue = messages[1] ?? {};
  const consent = contract.consent ?? {};
  const futurePrograms = contract.futurePrograms ?? {};
  const privacy = contract.privacy ?? {};
  const success = contract.success ?? {};
  const expectedFields = [
    { id: 'firstName', type: 'text', required: true, buttondownName: 'metadata__first_name' },
    { id: 'email', type: 'email', required: true, buttondownName: 'email' },
    { id: 'consent', type: 'checkbox', required: true, buttondownName: null },
    { id: 'company', type: 'honeypot', required: false, buttondownName: null },
  ];
  const expectedInvariants = [
    'Both public implementations submit to the same Buttondown audience.',
    'Visual treatment and surrounding copy may differ; field meaning and success semantics may not.',
    'Got Soap? adds a conditional Want to Learn More? seam to CWAAA after success.',
    'A missing cross-site URL produces no dead link.',
    'CWAAA authors the receipt and current issue for both public presentations.',
    'Buttondown confirmation or welcome delivery must fulfill the defined receipt or remain disabled; it may not become a third message.',
    'Consent withdrawal before current-issue delivery suppresses that issue.',
    'Future programs require separate approval, contract, and consent without altering Form CW-1.',
  ];

  if (contract.contractId !== 'lather-pledge.v1') {
    errors.push('Pledge contractId must be lather-pledge.v1.');
  }
  if (contract.version !== 1) {
    errors.push('Pledge contract version must be 1.');
  }
  if (contract.owner !== 'CWAAA') {
    errors.push('Pledge contract owner must remain CWAAA.');
  }
  if (JSON.stringify(contract.implementations) !== JSON.stringify(['Got Soap?', 'CWAAA'])) {
    errors.push('Pledge implementations must be Got Soap? and CWAAA in that order.');
  }
  if (contract.backend?.provider !== 'Buttondown') {
    errors.push('Pledge contract backend must be Buttondown.');
  }
  if (contract.backend?.audience !== 'one shared audience') {
    errors.push('Pledge contract must specify one shared audience.');
  }
  if (contract.backend?.configurationKey !== 'BUTTONDOWN_USERNAME') {
    errors.push('Pledge backend configurationKey must be BUTTONDOWN_USERNAME.');
  }
  if (JSON.stringify(contract.fields) !== JSON.stringify(expectedFields)) {
    errors.push('Pledge field definitions must remain exact, including required consent.');
  }
  if (fulfillment.author !== 'CWAAA') {
    errors.push('Pledge fulfillment author must be CWAAA.');
  }
  if (JSON.stringify(fulfillment.appliesToImplementations) !== JSON.stringify(['Got Soap?', 'CWAAA'])) {
    errors.push('Pledge fulfillment must cover Got Soap? and CWAAA in that order.');
  }
  if (fulfillment.totalMessages !== 2) {
    errors.push('Pledge fulfillment totalMessages must be exactly 2.');
  }
  if (messages.length !== 2) {
    errors.push('Pledge fulfillment must define exactly two message records.');
  }
  if (receipt.id !== 'pledgeReceipt') {
    errors.push('Pledge first message must be pledgeReceipt.');
  }
  if (receipt.sequence !== 1) {
    errors.push('Pledge pledgeReceipt sequence must be 1.');
  }
  if (receipt.delivery !== 'immediate') {
    errors.push('Pledge pledgeReceipt delivery must be immediate.');
  }
  if (receipt.maximumDeliveries !== 1) {
    errors.push('Pledge pledgeReceipt maximumDeliveries must be 1.');
  }
  if (receipt.consentWithdrawalMechanismRequired !== true) {
    errors.push('Pledge pledgeReceipt must provide consent withdrawal before the current issue.');
  }
  if (currentIssue.id !== 'currentIssue') {
    errors.push('Pledge second message must be currentIssue.');
  }
  if (currentIssue.sequence !== 2) {
    errors.push('Pledge currentIssue sequence must be 2.');
  }
  if (currentIssue.delivery !== 'separately after a configurable short delay') {
    errors.push('Pledge currentIssue must be delivered separately after a configurable short delay.');
  }
  if (currentIssue.maximumDeliveries !== 1) {
    errors.push('Pledge currentIssue maximumDeliveries must be 1.');
  }
  if (currentIssue.displayDateSource !== 'signup or send time') {
    errors.push('Pledge currentIssue display date must derive from signup or send time.');
  }
  if (currentIssue.preSendConsentCheckRequired !== true) {
    errors.push('Pledge currentIssue requires a pre-send consent check.');
  }
  if (currentIssue.suppressIfConsentWithdrawn !== true) {
    errors.push('Pledge currentIssue must be suppressed after consent withdrawal.');
  }
  if (currentIssue.unsubscribeMechanismRequired !== true) {
    errors.push('Pledge currentIssue must include a functioning unsubscribe mechanism.');
  }
  if (fulfillment.providerExtraMessageAllowed !== false) {
    errors.push('Pledge provider must not add a third message.');
  }
  if (fulfillment.ongoingSubscription !== false) {
    errors.push('Pledge ongoingSubscription must remain false.');
  }
  if (fulfillment.dripCampaign !== false) {
    errors.push('Pledge dripCampaign must remain false.');
  }
  if (consent.required !== true) {
    errors.push('Pledge consent must remain required.');
  }
  if (consent.disclosesExactlyTwoMessages !== true) {
    errors.push('Pledge consent must disclose exactly two messages.');
  }
  if (consent.disclosesImmediateReceipt !== true) {
    errors.push('Pledge consent must disclose the immediate receipt.');
  }
  if (consent.disclosesSeparateCurrentIssue !== true) {
    errors.push('Pledge consent must disclose the separately delivered current issue.');
  }
  if (consent.disclosesNoOngoingSubscription !== true) {
    errors.push('Pledge consent must disclose there is no ongoing subscription.');
  }
  if (consent.withdrawalBeforeCurrentIssueSuppressesDelivery !== true) {
    errors.push('Pledge consent withdrawal must suppress an unsent currentIssue.');
  }
  if (futurePrograms.requiresSeparateOwnerApproval !== true) {
    errors.push('Pledge future programs require separate owner approval.');
  }
  if (futurePrograms.requiresSeparateContract !== true) {
    errors.push('Pledge future programs require a separate contract.');
  }
  if (futurePrograms.requiresSeparateConsent !== true) {
    errors.push('Pledge future programs require separate consent.');
  }
  if (futurePrograms.altersFormCw1 !== false) {
    errors.push('Pledge future programs must not alter Form CW-1.');
  }
  if (privacy.analyticsMayReceiveFieldValues !== false) {
    errors.push('Pledge field values must not enter analytics.');
  }
  if (privacy.pledgeAndEmailValuesMayEnterAnalytics !== false) {
    errors.push('Pledge and email values must not enter analytics.');
  }
  if (privacy.retentionScope !== 'minimum Buttondown data needed to fulfill two messages and honor suppression') {
    errors.push('Pledge privacy must define minimum Buttondown retention.');
  }
  if (privacy.removeUnneededFulfillmentMetadataAfterCompletion !== true) {
    errors.push('Pledge unneeded fulfillment metadata must be removed after completion.');
  }
  if (privacy.suppressionRecordMayBeRetained !== true) {
    errors.push('Pledge suppression record may be retained to prevent accidental resend.');
  }
  if (privacy.additionalProviderAuthorized !== false) {
    errors.push('Pledge no additional provider is authorized.');
  }
  if (success.semantic !== 'SWORN') {
    errors.push('Pledge success semantic must be SWORN.');
  }
  if (success.mustOfferShare !== true) {
    errors.push('Pledge success must offer share.');
  }
  if (success.mustOfferCopyLink !== true) {
    errors.push('Pledge success must offer copy link.');
  }
  if (privacy.requiresAffirmativeConsent !== true) {
    errors.push('Pledge privacy requires affirmative consent.');
  }
  if (JSON.stringify(contract.invariants) !== JSON.stringify(expectedInvariants)) {
    errors.push('Pledge contract invariants must remain exact and complete.');
  }

  return errors;
}

function read(root, relativePath) {
  const path = resolve(root, relativePath);
  return existsSync(path) ? readFileSync(path, 'utf8') : null;
}

function readBuffer(root, relativePath) {
  const path = resolve(root, relativePath);
  return existsSync(path) ? readFileSync(path) : null;
}

function requireFile(root, relativePath, errors) {
  const content = read(root, relativePath);
  if (content === null) errors.push(`${relativePath}: required authority file is missing`);
  return content ?? '';
}

function parseJson(root, relativePath, errors) {
  const content = requireFile(root, relativePath, errors);
  if (!content) return null;
  try {
    return JSON.parse(content);
  } catch (error) {
    errors.push(`${relativePath}: invalid JSON (${error.message})`);
    return null;
  }
}

export function collectAuthorityErrors(repoRoot) {
  const errors = [];


  const worldReadme = requireFile(repoRoot, 'docs/world/README.md', errors);
  errors.push(...missingRequiredMarkers(worldReadme, [
    'SHARED AUTHORITY',
    'PER-SYSTEM AUTHORITY',
    'EXTRACTION',
    'GOTSOAP-WORLD-CANON.V1',
    'VERSION 1',
    'SOURCE COMMIT',
    'SUBORDINATE SNAPSHOT',
    'RESYNC',
  ], 'docs/world/README.md'));

  const worldBible = requireFile(repoRoot, 'docs/world/WORLD-BIBLE.md', errors);
  errors.push(...missingRequiredMarkers(worldBible, [
    'OBJECTIVE CANON',
    'PUBLIC CLAIM',
    'INTENTIONALLY UNRESOLVED',
    '1961',
    '2024',
    'GOT SOAP? SEDUCES',
    'CWAAA VALIDATES AND ORGANIZES',
    'THE OFFICE ASSUMES JURISDICTION',
    'KNOWLEDGE MATRIX',
  ], 'docs/world/WORLD-BIBLE.md'));

  const artifactContinuity = requireFile(
    repoRoot,
    'docs/world/artifact-continuity.md',
    errors,
  );
  errors.push(...missingRequiredMarkers(artifactContinuity, [
    'FIRST MEANING',
    'LATER MEANING',
    'RECURRENCE RULE',
    'FORBIDDEN EXPLANATION',
    'OFFICE PEN',
    '1-800-GOT-SOAP',
    'FICTIONAL OWNER',
    'DOCUMENTATION AUTHORITY',
    'SHARED PLEDGE CORE',
  ], 'docs/world/artifact-continuity.md'));

  const ivrAuthority = requireFile(
    repoRoot,
    'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
    errors,
  );
  errors.push(...missingRequiredMarkers(ivrAuthority, [
    'NUMBER LIVES ON GOT SOAP?',
    'TWO PRESENTED VOICES',
    'NO THIRD OFFICE VOICE',
    'NO AUDIBLE TRANSFER',
    'WE HAVE YOUR NUMBER',
    'SOMEONE IS ALREADY ON THEIR WAY',
    'INTENTIONAL WRONGNESS',
    'FIELD ASSESSORS',
    'THE HIDDEN BRANCH',
    'OFFICE AFTER-HOURS VOICEMAIL',
    'EVERYTHING IS NOTED',
    'BINDING',
  ], 'IVR authority'));

  errors.push(...validateIvrIntegrity(readBuffer(
    repoRoot,
    'docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf',
  )));
  const liveDocuments = [
    'AGENTS.md',
    'CLAUDE.md',
    '.claude/rules/gotsoap-web-design.md',
    'docs/HANDOFF.md',
    'docs/design.md',
    'docs/prd/PRD-gotsoap-web-v1.md',
    'docs/strategy/participation-mechanics.md',
    'docs/strategy/cwaaa-divergence-roadmap.md',
  ];

  const liveDocumentContents = new Map();
  for (const path of liveDocuments) {
    const content = requireFile(repoRoot, path, errors);
    liveDocumentContents.set(path, content);
    errors.push(...findForbiddenAuthorityPhrases(content, path));
  }

  errors.push(...missingRequiredMarkers(liveDocumentContents.get('docs/HANDOFF.md') ?? '', [
    'AUTHORITY PRECEDENCE',
    '1. OWNER DECISIONS RECORDED IN `DOCS/HANDOFF.MD`',
    '2. `DOCS/WORLD/WORLD-BIBLE.MD`',
    '3. THE RELEVANT PER-SYSTEM WORLD BIBLE',
    '4. THE RELEVANT CURRENT DESIGN AUTHORITY AND PRD',
    '5. SHARED AND PER-SYSTEM MACHINE-READABLE CONTRACTS',
    '6. ARTIFACT BRIEFS AND COPY DECKS',
    '7. HISTORICAL DOCUMENTS',
    '`DOCS/GOTSOAP/WORLD-BIBLE.MD`',
    '`DOCS/OFFICE-OF-LATHER-COMPLIANCE/WORLD-BIBLE.MD`',
    'SHOP REMAINS CANONICAL',
    'UNAVAILABLE CHECKOUT',
    '`/BROADCAST`',
    'FULL-BLEED HOMEPAGE PREMIERE SEAM',
    'PHONE NUMBER IS OWNED BY GOT SOAP?',
    'TWO PRESENTED VOICES',
    'NO AUDIBLE TRANSFER',
    'OFFICE HAS EXISTED SINCE 1961',
    'CWAAA WAS ESTABLISHED IN 2024',
    'THIRD DISTINCT BROWSER SESSION',
  ], 'docs/HANDOFF.md'));

  const gotSoapDesign = requireFile(repoRoot, 'docs/design.md', errors);
  errors.push(...missingRequiredMarkers(gotSoapDesign, [
    'THE WEBSITE IS THE CAMPAIGN',
    'EDITORIAL BRUTALISM',
    'SNIFF TEST',
    'WANT TO LEARN MORE?',
    'ANTI-TEMPLATE',
  ], 'docs/design.md'));

  const gotSoapBible = requireFile(repoRoot, 'docs/gotsoap/world-bible.md', errors);
  errors.push(...missingRequiredMarkers(gotSoapBible, [
    'EROTIC ASPIRATION',
    'POTENTIAL CONVERT',
    'WITNESS AND RECRUITER',
    'WHAT GOT SOAP? FINDS FUNNY',
    'WHAT BREAKS THE ILLUSION',
    'UTILITY VOICE',
  ], 'docs/gotsoap/world-bible.md'));

  const gotSoapPrd = requireFile(repoRoot, 'docs/prd/PRD-gotsoap-web-v1.md', errors);
  errors.push(...missingRequiredMarkers(gotSoapPrd, [
    'ONE BUTTONDOWN AUDIENCE',
    'SNIFF TEST',
    'CWAAA_SITE_URL',
    'WANT TO LEARN MORE?',
    'SHOP',
    '/BROADCAST',
    '1-800-GOT-SOAP',
    'UNAVAILABLE CHECKOUT',
    'CWAAA AUTHORS FULFILLMENT FOR BOTH PUBLIC PLEDGE PRESENTATIONS',
    'EXACTLY TWO MESSAGES',
    'FUNCTIONING UNSUBSCRIBE',
    'MINIMUM BUTTONDOWN DATA',
  ], 'docs/prd/PRD-gotsoap-web-v1.md'));

  const cwaaaReadme = requireFile(repoRoot, 'docs/cwaaa/README.md', errors);
  errors.push(...missingRequiredMarkers(cwaaaReadme, [
    'CREDIBLE FICTIONAL ADVOCACY NONPROFIT',
    'LEGALLY SEPARATE FICTIONAL',
    'GOVERNMENT AGENCY',
    'PUBLIC SITE PRESENTS ONLY CWAAA',
    'AUTHORSHIP',
    'GOTSOAP-WORLD-CANON.V1',
    'VERSION 1',
    'SOURCE COMMIT',
    'SUBORDINATE SNAPSHOT',
    'RESYNC',
  ], 'docs/cwaaa/README.md'));

  const cwaaaBible = requireFile(repoRoot, 'docs/cwaaa/world-bible.md', errors);
  errors.push(...missingRequiredMarkers(cwaaaBible, [
    'GOT SOAP? CAMPAIGNS',
    'CWAAA ADVOCATES AND FILES',
    'OFFICE OF LATHER COMPLIANCE REGULATES',
    'THE LATHER PLEDGE',
    'OBJECTIVE CANON',
    'NEVER MANUFACTURES FEAR',
    'ACCIDENTALLY REVEAL',
    'PHYSICAL SPACE',
    'EMAIL',
    'TELEPHONE',
    'EVENTS',
    'WHAT IT NEVER SAYS',
    'MAKES ITS CASE IN PUBLIC',
    'EARNS TRUST FIRST',
    'NEVER PERFORMS HORROR',
    'PAPER IS CONTENT',
    'CREATOR/ABOUT SEAM',
  ], 'docs/cwaaa/world-bible.md'));

  const cwaaaDesign = requireFile(repoRoot, 'docs/cwaaa/design.md', errors);
  errors.push(...missingRequiredMarkers(cwaaaDesign, [
    'A COALITION MAKING ITS CASE IN PUBLIC',
    'THE BAR IS SOAP',
    'DOCUMENT. ADVOCATE. ORGANIZE.',
    'RECOVERY STORIES',
    'TIE ONE ON',
    'CHAPTERS',
    'PAPER IS CONTENT, NOT THE UNIVERSE',
    '50% DOCUMENTARY HUMAN TRACES',
    '30% COHERENT PHYSICAL ARTIFACTS',
    '20% LIVE CIVIC GRAPHICS',
    'PARTICIPANT ADVOCACY FILES',
    'NOT POLICE EVIDENCE',
    'NEUTRAL CITATION',
  ], 'docs/cwaaa/design.md'));

  const cwaaaPrd = requireFile(repoRoot, 'docs/cwaaa/PRD-cwaaa-web-v1.md', errors);
  errors.push(...missingRequiredMarkers(cwaaaPrd, [
    'IMMEDIATE PLEDGE RECEIPT',
    'ONE SEPARATELY DELIVERED CURRENT ISSUE',
    'MONTH AND YEAR',
    'NOT AN ONGOING',
    'CWAAA AUTHORS FULFILLMENT FOR BOTH PUBLIC PLEDGE PRESENTATIONS',
    'EXACTLY TWO MESSAGES',
    'FUNCTIONING UNSUBSCRIBE',
    'MINIMUM BUTTONDOWN DATA',
    '/RECOVERY-STORIES',
    '/CHAPTERS',
    '/CASE-FILES',
    'REDIRECT',
    'THE BAR IS SOAP',
    'CREATOR/ABOUT SEAM',
  ], 'docs/cwaaa/PRD-cwaaa-web-v1.md'));

  const cwaaaMigration = requireFile(
    repoRoot,
    'docs/cwaaa/migration-manifest.md',
    errors,
  );
  errors.push(...missingRequiredMarkers(cwaaaMigration, [
    'GOTSOAP-WORLD-CANON.V1',
    'SOURCE COMMIT',
    'SUBORDINATE SNAPSHOT',
    'RESYNC',
    'MOVEMENT UPDATES',
    'REQUIRED MIGRATION/COPY-LANE CORRECTION',
    'CWAAA FIELD ASSESSORS',
    'TARGET OWNERSHIP IS GOT SOAP?',
  ], 'docs/cwaaa/migration-manifest.md'));

  const officeReadme = requireFile(
    repoRoot,
    'docs/office-of-lather-compliance/README.md',
    errors,
  );
  const officeBible = requireFile(
    repoRoot,
    'docs/office-of-lather-compliance/world-bible.md',
    errors,
  );
  errors.push(...missingRequiredMarkers(officeBible, [
    '1961',
    'DELIBERATELY UNSPECIFIED',
    'STANDING CONTAINMENT REFERENCE',
    'VISITOR SUPPLIES THE FEAR',
    'INTENTIONALLY UNRESOLVED',
  ], 'Office world bible'));
  const officeDesign = requireFile(
    repoRoot,
    'docs/office-of-lather-compliance/design.md',
    errors,
  );
  const officePrd = requireFile(
    repoRoot,
    'docs/office-of-lather-compliance/PRD-office-v1.md',
    errors,
  );
  const officeCorpus = `${officeReadme}\n${officeDesign}\n${officePrd}`;
  errors.push(...missingRequiredMarkers(officeCorpus, [
    'ERROR STATES ONLY',
    'DELIBERATELY UNSPECIFIED',
    'FIRST ACCESS',
    'SAME-SESSION REFRESH',
    'LATER RETURN',
    'CONTINUED INTEREST',
    'BROWSER-LOCAL',
    'NO ORDINARY HOMEPAGE',
    'PLEASE REMAIN AVAILABLE',
    'SAME-SESSION REFRESH APPLIES ONLY WHILE',
    '`RETURNSESSIONCOUNT` IS BELOW `2`',
  ], 'Office package'));

  errors.push(...missingRequiredMarkers(officeReadme, [
    'GOTSOAP-WORLD-CANON.V1',
    'VERSION 1',
    'SOURCE COMMIT',
    'SUBORDINATE SNAPSHOT',
    'RESYNC',
  ], 'docs/office-of-lather-compliance/README.md'));

  const campaignPledge = parseJson(repoRoot, 'docs/contracts/pledge.v1.json', errors);
  const cwaaaPledge = parseJson(repoRoot, 'docs/cwaaa/contracts/pledge.v1.json', errors);
  if (campaignPledge && cwaaaPledge) {
    const campaignPledgeDocument = readBuffer(repoRoot, 'docs/contracts/pledge.v1.json');
    const cwaaaPledgeDocument = readBuffer(repoRoot, 'docs/cwaaa/contracts/pledge.v1.json');
    errors.push(...compareRawDocuments(campaignPledgeDocument, cwaaaPledgeDocument));
    errors.push(...validatePledgeContract(campaignPledge));
  }

  const officeState = parseJson(
    repoRoot,
    'docs/office-of-lather-compliance/contracts/visit-state.v1.json',
    errors,
  );
  if (officeState) {
    errors.push(...validateOfficeStateContract(officeState));
    if (officeState.jurisdiction !== 'deliberately unspecified') {
      errors.push('Office jurisdiction must remain deliberately unspecified.');
    }
    if (officeState.publicSurfaceModel !== 'error states only') {
      errors.push('Office public surface model must remain error states only.');
    }
    if (
      officeState.storage?.ipAddress !== false
      || officeState.storage?.fingerprinting !== false
      || officeState.storage?.serverPersistence !== false
    ) {
      errors.push('Office recognition must remain local, IP-free, and fingerprint-free.');
    }
  }

  const pathAwareDocuments = new Map([
    ...liveDocumentContents,
    ['docs/world/README.md', worldReadme],
    ['docs/world/WORLD-BIBLE.md', worldBible],
    ['docs/world/artifact-continuity.md', artifactContinuity],
    ['docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md', ivrAuthority],
    ['docs/gotsoap/world-bible.md', gotSoapBible],
    ['docs/prd/PRD-gotsoap-web-v1.md', gotSoapPrd],
    ['docs/cwaaa/README.md', cwaaaReadme],
    ['docs/cwaaa/world-bible.md', cwaaaBible],
    ['docs/cwaaa/design.md', cwaaaDesign],
    ['docs/cwaaa/PRD-cwaaa-web-v1.md', cwaaaPrd],
    ['docs/cwaaa/migration-manifest.md', cwaaaMigration],
    ['docs/office-of-lather-compliance/README.md', officeReadme],
    ['docs/office-of-lather-compliance/world-bible.md', officeBible],
    ['docs/office-of-lather-compliance/design.md', officeDesign],
    ['docs/office-of-lather-compliance/PRD-office-v1.md', officePrd],
  ]);
  for (const [path, content] of pathAwareDocuments) {
    errors.push(...validatePathAwareCanon(path, content));
  }

  return errors;
}
