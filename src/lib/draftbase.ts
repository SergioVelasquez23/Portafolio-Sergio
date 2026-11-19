import { createClient, type Entry } from "@draftbase/sdk";

import * as local from "../data/portfolio.mjs";

const apiKey = import.meta.env.DRAFTBASE_API_KEY;

// Con API key el contenido sale de Draftbase (en build). Sin ella, el sitio usa
// src/data/portfolio.mjs, así que `npm run dev` y `npm run build` funcionan sin CMS.
const client = apiKey
	? createClient({
			apiKey,
			baseUrl: import.meta.env.DRAFTBASE_API_URL ?? "https://api.draftbase.co",
			environment: import.meta.env.DRAFTBASE_ENVIRONMENT ?? "production",
			cacheTtlMs: 60_000,
		})
	: null;

const localContent: Record<string, unknown[]> = {
	profile: [local.profile],
	project: local.projects,
	experience: local.experience,
	education: local.education,
	skill: local.skills,
	faq: local.faqs,
};

/**
 * All published entries of one template, following cursor pagination to the end.
 * `templateId` is the template's key (e.g. "project"), not a database id.
 */
export async function getAll<Fields>(templateId: string): Promise<Entry<Fields>[]> {
	if (!client) {
		return (localContent[templateId] ?? []).map((fields) => ({ fields }) as Entry<Fields>);
	}
	const all: Entry<Fields>[] = [];
	let after: string | undefined;
	do {
		// The SDK's option is named `contentTypeId`, but the API's query param is `templateId`.
		const page = await client.getEntries<Fields>({ templateId, after, limit: 100, include: 1 });
		all.push(...page.entries);
		after = page.nextCursor ?? undefined;
	} while (after);
	return all;
}

/** A `media` field resolved by `include` — or null when the field is empty. */
export function imageUrl(field: unknown): string | null {
	return (field as { url?: string | null } | null)?.url ?? null;
}

/** Imagen de un campo media: URL absoluta del CMS, o archivo de public/ (portada local). */
export function mediaSrc(field: unknown): string | null {
	const u = imageUrl(field);
	if (!u) return null;
	return /^(https?:)?\/\//.test(u) ? u : url(u);
}

/** Prefixes a path with the configured `base`, so links work on a GitHub Pages project site. */
export function url(path = ""): string {
	return import.meta.env.BASE_URL.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
}

export interface Project {
	title: string;
	slug: string;
	summary: string;
	body: string;
	cover?: { url?: string | null; altText?: string } | null;
	liveUrl?: string;
	year?: number;
	featured?: boolean;
	tech?: string;
}

export interface Faq {
	question: string;
	answer: string;
	order?: number;
}

export interface Profile {
	name: string;
	headline: string;
	bio: string;
	avatar?: { url?: string | null; altText?: string } | null;
	email?: string;
	githubUrl?: string;
	linkedinUrl?: string;
	phone?: string;
	location?: string;
}

export interface Experience {
	role: string;
	company: string;
	location?: string;
	period?: string;
	description?: string;
	tags?: string;
	order?: number;
}

export interface Education {
	degree: string;
	institution?: string;
	period?: string;
	description?: string;
	tags?: string;
	order?: number;
}

export interface Skill {
	category: string;
	items: string;
	order?: number;
}
