# @replaypilot/sdk

Typed SDK for [ReplayPilot](https://replaypilot.com) session replay. Instead
of hand-writing a `<script>` tag, call `init()` once and it injects the
hosted snippet for you.

## Install

```sh
npm install @replaypilot/sdk
```

## Usage

```ts
import { init, track, identify, grantConsent } from "@replaypilot/sdk";

init({ projectId: "pk_live_xxxxxxxx" });

// Tag a product event
track("checkout_completed", { plan: "pro" });

// Tag the session with your own user id
identify("user_123", { plan: "pro" });
```

### Consent-gated recording

```ts
init({ projectId: "pk_live_xxxxxxxx", requireConsent: true });

// later, once the visitor accepts your cookie banner
grantConsent();
```

### Self-hosted / local ingest

```ts
init({ projectId: "pk_live_xxxxxxxx", endpoint: "https://ingest.yourdomain.com" });
```

## What this does — and doesn't — capture

This SDK covers session replay, click/heatmap data, and custom events sent
via `track`/`identify`. It does not replace an error-tracking SDK: for
structured error logging, stack traces, and alerting, pair it with
[Sentry](https://sentry.io) (or a similar tool) — ReplayPilot's own error
capture is scoped to what happens during a recorded session, not
application-wide exception monitoring.

## License

MIT
