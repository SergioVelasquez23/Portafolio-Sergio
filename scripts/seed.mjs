/**
 * Creates this example's templates and a few published entries in your Draftbase org.
 *
 * Run locally only — it needs a MANAGEMENT-scoped key, which can write and delete content.
 * Never put that key in CI or in a hosting provider's environment.
 *
 *   cp .env.example .env   # add DRAFTBASE_MANAGEMENT_API_KEY
 *   npm run seed
 *
 * Safe to re-run: existing templates are left alone and entries are matched by title.
 */
import { readFileSync } from "node:fs";
import { profile, projects, experience, education, skills, faqs } from "../src/data/portfolio.mjs";
const BASE_URL = process.env.DRAFTBASE_API_URL || "https://api.draftbase.co";
const API_KEY = process.env.DRAFTBASE_MANAGEMENT_API_KEY;
const ENV_ID = process.env.DRAFTBASE_ENVIRONMENT || "production";
const LOCALE = "es-CO";

if (!API_KEY) {
	console.error("Set DRAFTBASE_MANAGEMENT_API_KEY in .env (see .env.example).");
	process.exit(1);
}

async function api(path, { method = "GET", body } = {}) {
	// A full seed is a burst of writes, so the API's rate limiter is expected rather than
	// exceptional — back off and retry instead of leaving the org half-seeded.
	for (let attempt = 0; ; attempt++) {
		const res = await fetch(new URL(path, BASE_URL), {
			method,
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				...(body ? { "Content-Type": "application/json" } : {}),
			},
			body: body ? JSON.stringify(body) : undefined,
		});
		if (res.status === 429 && attempt < 5) {
			const seconds = Number(res.headers.get("retry-after")) || 2 ** attempt;
			console.log(`rate limited, retrying in ${seconds}s`);
			await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
			continue;
		}
		if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${await res.text()}`);
		return res.status === 204 ? null : res.json();
	}
}

/** A template's key is derived from its name ("Blog Post" -> "blogPost"), and is what
 *  entries and the delivery API refer to as `templateId`. */
async function ensureTemplate(template) {
	const existing = await api(`/templates?envId=${ENV_ID}`);
	const match = existing.find((t) => t._id === template.key);
	if (match) {
		console.log(`template ${template.key} already exists`);
		return match._id;
	}
	const { key, ...body } = template;
	const created = await api("/templates", { method: "POST", body: { ...body, envId: ENV_ID } });
	console.log(`template ${created._id ?? key} created`);
	return created._id ?? key;
}

/** Downloads a remote image and pushes it through Draftbase's presigned-upload flow. */
async function uploadImage(url, fileName, altText) {
	const file = await fetch(url);
	if (!file.ok) throw new Error(`could not download ${url}`);
	const contentType = file.headers.get("content-type") ?? "image/jpeg";
	const blob = await file.blob();

	const upload = await api("/media/upload-url", {
		method: "POST",
		body: { fileName, contentType, envId: ENV_ID },
	});
	const form = new FormData();
	for (const [name, value] of Object.entries(upload.fields)) form.append(name, value);
	form.append("file", blob, fileName);
	const put = await fetch(upload.url, { method: "POST", body: form });
	if (!put.ok) throw new Error(`storage upload failed: ${put.status} ${await put.text()}`);

	const { id } = await api("/media/confirm", {
		method: "POST",
		body: { storageKey: upload.storageKey, contentType, envId: ENV_ID, altText },
	});
	return id;
}

async function ensureEntry(templateId, titleField, fields, tags = []) {
	const list = await api(`/entries?envId=${ENV_ID}&templateId=${templateId}&limit=100`);
	const match = list.items.find((e) => e.fields[titleField] === fields[titleField]);
	if (match) {
		// Re-publish rather than skip: a previous run interrupted between create and publish
		// leaves a draft the site cannot see.
		if (match.status !== "published") {
			await api(`/entries/${match._id}/status`, {
				method: "PATCH",
				body: { status: "published" },
			});
		}
		console.log(`entry "${fields[titleField]}" already exists`);
		return match._id;
	}
	const { id } = await api("/entries", {
		method: "POST",
		body: { templateId, locale: LOCALE, envId: ENV_ID, fields, tags },
	});
	await api(`/entries/${id}/status`, { method: "PATCH", body: { status: "published" } });
	console.log(`entry "${fields[titleField]}" created and published`);
	return id;
}

// Shared with the Draftbase web panel, which creates these same templates when it deploys
// this example to GitHub Pages — edit the JSON, not a copy here.
const templates = JSON.parse(
	readFileSync(new URL("../draftbase.templates.json", import.meta.url), "utf8"),
);

async function main() {
	for (const template of templates) await ensureTemplate(template);
	// The CLI (`npm create draftbase`) seeds schema only, so a new project starts empty.
	if (process.env.SEED_TEMPLATES_ONLY) return;

	// El avatar no se sube aquí: agrégalo desde el panel de Draftbase (campo "Avatar").
	await ensureEntry("profile", "name", profile);
	// `cover` apunta a public/ (solo para el modo local); en el CMS súbela como media.
	for (const { cover, ...project } of projects) await ensureEntry("project", "title", project);
	for (const item of experience) await ensureEntry("experience", "role", item);
	for (const item of education) await ensureEntry("education", "degree", item);
	for (const item of skills) await ensureEntry("skill", "category", item);
	for (const faq of faqs) await ensureEntry("faq", "question", faq);

	console.log("\nSeed complete. Run `npm run dev`.");
}

main().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
