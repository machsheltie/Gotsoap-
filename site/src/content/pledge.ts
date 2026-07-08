/**
 * pledge.ts — /pledge (Form CW-1) copy, transcribed VERBATIM from
 * copy-deck-v2.md §7 (+ §2 meta). 📋 CWAAA voice — the org files, never flirts.
 * Do not paraphrase. Field names are the Netlify Forms wire contract.
 *
 * Quote convention: the deck uses STRAIGHT ASCII apostrophes/quotes (matched
 * here); only em dash (—), middot (·), and ellipsis (…) are Unicode. Strings
 * are backtick-delimited so straight ' and " never fight the JS delimiter.
 */
import type { RouteMeta } from './types';

/** Letterhead header of Form CW-1 (deck §7.1). */
export interface PledgeHeader {
  /** Org line (Libre-Franklin-cadence but rendered PT Serif on this surface). */
  org: string;
  /** Form number eyebrow. */
  formLine: string;
  /** The document title (page h1). */
  docTitle: string;
  /** The dry procedural instruction under the title. */
  instruction: string;
}

/** The oath (deck §7.2) — an intro, four sworn clauses, the refrain. */
export interface PledgeOath {
  intro: string;
  clauses: string[];
  refrain: string;
}

/** A single labelled form field (deck §7.3). */
export interface PledgeField {
  label: string;
  /** The `name` attribute — this is the Netlify Forms wire contract. */
  name: string;
  /** The procedural helper line under the field. */
  help: string;
}

/** The form's copy + wire contract (deck §7.3). */
export interface PledgeForm {
  /** Netlify form name — must match the hidden `form-name` input. */
  netlifyName: string;
  /** Honeypot field name — must match `netlify-honeypot`. */
  honeypotName: string;
  firstName: PledgeField;
  email: PledgeField;
  /** The required satire-acknowledgment checkbox. */
  acknowledgment: Omit<PledgeField, 'help'>;
  submitLabel: string;
  submitAside: string;
  /** Screen-reader/required annotation. */
  requiredNote: string;
}

/** Procedural validation errors (deck §7.3) — never scolding. */
export interface PledgeErrors {
  name: string;
  email: string;
  acknowledgment: string;
}

/** The SWORN success state (deck §7.4). `[name]` is filled client-side. */
export interface PledgeSuccess {
  heading: string;
  /** Text before the interpolated first name. */
  filedLead: string;
  /** Text after the interpolated first name. */
  filedRest: string;
  roll: string;
  shareLabel: string;
  copyLabel: string;
  updates: string;
}

export interface PledgeContent {
  header: PledgeHeader;
  oath: PledgeOath;
  form: PledgeForm;
  errors: PledgeErrors;
  success: PledgeSuccess;
  /** Privacy note (deck §7.5) — in voice, true. */
  privacy: string;
  /** Default share text for the success share row (deck §7.6). */
  badgeShare: string;
  meta: RouteMeta;
}

export const pledge: PledgeContent = {
  header: {
    org: `CONCERNED WOMEN AGAINST AXE ABUSE`,
    formLine: `FORM CW-1`,
    docTitle: `Declaration of Intent to Lather`,
    instruction: `To be completed by the undersigned, of sound mind and disputed scent.`,
  },
  oath: {
    intro: `I, the undersigned, do solemnly swear:`,
    clauses: [
      `to lather daily;`,
      `to retire body spray as a personality;`,
      `to respect the loofah in word and deed;`,
      `and never again to mistake deodorant for divine intervention.`,
    ],
    refrain: `Lather. Rinse. Respect.`,
  },
  form: {
    netlifyName: `lather-pledge`,
    honeypotName: `bot-field`,
    firstName: {
      label: `First name`,
      name: `first-name`,
      help: `As it will appear on the roll.`,
    },
    email: {
      label: `Email`,
      name: `email`,
      help: `Where to send Movement Updates.`,
    },
    acknowledgment: {
      label: `I understand this is satire and also a binding moral contract.`,
      name: `satire-acknowledgment`,
    },
    submitLabel: `File my declaration`,
    submitAside: `Filed in triplicate. One copy goes to the loofah.`,
    requiredNote: `(required)`,
  },
  errors: {
    name: `A declaration requires a declarant. First name, please.`,
    email: `The Records Division cannot file this email address as written.`,
    acknowledgment: `The satire acknowledgment is required. It is binding. Morally.`,
  },
  success: {
    heading: `SWORN.`,
    filedLead: `Declaration filed, `,
    filedRest: `. The Office of Lather Compliance thanks you and quietly believes in you.`,
    roll: `You are now on the roll of a movement that refuses to say how many it will take.`,
    shareLabel: `Issue the announcement`,
    copyLabel: `Copy the case number`,
    updates: `Movement Updates will arrive when there is movement.`,
  },
  privacy: `Your email does one job: Movement Updates — new posters, the occasional bulletin, nothing you'd resent. We don't sell it, share it, or hand it to "partners." Unsubscribe any time. CWAAA keeps records, not secrets.`,
  badgeShare: `I took the pledge. Lather. Rinse. Respect. #GotSoap`,
  meta: {
    title: `The Lather Pledge — Form CW-1 | got soap?`,
    description: `Declaration of Intent to Lather. Sign the oath, join two million women who've had enough, and smell like you meant it.`,
  },
};
