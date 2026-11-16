/**
 * Keep contact details out of the HTML so address-harvesting bots can't scrape them.
 *
 * The server strips `basics.email` and `basics.phone` from the resume before it is rendered or
 * serialised, and sends them separately as an encoded string. The browser decodes them only when
 * someone clicks "reveal". This doesn't stop a determined human, but it defeats the bots that
 * grep pages for `name@domain` and `mailto:` links, which is where most spam comes from.
 *
 * Runtime-agnostic (Workers, Node, browser): used by the server and the snapshot script.
 */
import type { Resume } from './types.ts';

/** Encoded contact details. Decode with `revealContact` in the browser. */
export interface HiddenContact {
	email?: string;
	phone?: string;
}

const KEY = 0x2a;

/** UTF-8 → XOR → reversed → base64url. Not encryption; just enough to look like noise. */
export function concealContact(value: string): string {
	const bytes = new TextEncoder()
		.encode(value)
		.map((b) => b ^ KEY)
		.reverse();
	return btoa(String.fromCharCode(...bytes))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
}

export function revealContact(code: string): string {
	const b64 = code.replace(/-/g, '+').replace(/_/g, '/');
	const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
		.reverse()
		.map((b) => b ^ KEY);
	return new TextDecoder().decode(bytes);
}

/** Returns a copy of the resume without email/phone, plus those values encoded. */
export function redactContact(resume: Resume): { resume: Resume; hidden: HiddenContact } {
	const { email, phone, ...basics } = resume.basics ?? {};
	const hidden: HiddenContact = {};
	if (email) hidden.email = concealContact(email);
	if (phone) hidden.phone = concealContact(phone);
	return { resume: resume.basics ? { ...resume, basics } : resume, hidden };
}
