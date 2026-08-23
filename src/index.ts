export type ReplayPilotInitOptions = {
	/** Project key from the ReplayPilot dashboard, e.g. pk_live_xxxxxxxx. */
	projectId: string;
	/** Ingest origin; override for self-hosted or local dev only. */
	endpoint?: string;
	/** When true, capture waits for grantConsent() before starting. */
	requireConsent?: boolean;
};

type ReplayPilotGlobal = {
	track: (name: string, props?: any) => void;
	identify: (userId: string, traits?: any) => void;
	grantConsent: () => void;
};

declare global {
	interface Window {
		ReplayPilot?: ReplayPilotGlobal;
	}
}

// Hosted bundle does the actual capture; the SDK just injects+wraps it.
const SNIPPET_SRC = "https://replaypilot.com/snippet.js";

let ready = false;
let queued: Array<() => void> = [];

function callOrQueue(fn: (rp: ReplayPilotGlobal) => void): void {
	if (typeof window === "undefined") return;
	if (ready && window.ReplayPilot) {
		fn(window.ReplayPilot);
	} else {
		queued.push(() => window.ReplayPilot && fn(window.ReplayPilot));
	}
}

/** Injects the ReplayPilot snippet and starts session capture. Call once. */
export function init(options: ReplayPilotInitOptions): void {
	if (typeof document === "undefined") return;
	if (document.querySelector("script[data-replaypilot-sdk]")) return;

	const script = document.createElement("script");
	script.src = SNIPPET_SRC;
	script.async = true;
	script.dataset.project = options.projectId;
	script.dataset.replaypilotSdk = "true";
	if (options.endpoint) script.dataset.endpoint = options.endpoint;
	if (options.requireConsent) script.dataset.requireConsent = "true";
	script.addEventListener("load", () => {
		ready = true;
		const pending = queued;
		queued = [];
		for (const run of pending) run();
	});
	document.head.appendChild(script);
}

/** Tags a custom product event; queues until init() finishes loading. */
export function track(eventName: string, props?: any): void {
	callOrQueue((rp) => rp.track(eventName, props));
}

/** Tags the session with the end-customer's real user id and traits. */
export function identify(userId: string, traits?: any): void {
	callOrQueue((rp) => rp.identify(userId, traits));
}

/** Grants recording consent when requireConsent was set in init(). */
export function grantConsent(): void {
	callOrQueue((rp) => rp.grantConsent());
}
