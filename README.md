# @replaypilot/sdk

Typed SDK for [ReplayPilot](https://replaypilot.com) session replay. Call
`init()` once and it injects the hosted snippet, no `<script>` tag by hand.

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

## Need error tracking?

ReplayPilot speaks Sentry's own envelope protocol. Point any Sentry SDK
(`@sentry/browser`, `@sentry/node`, `@sentry/nextjs`, and the rest) at
ReplayPilot's ingest endpoint by swapping the `dsn`, no ReplayPilot-specific
error SDK needed:

```ts
import * as Sentry from "@sentry/browser";

Sentry.init({ dsn: "https://pk_live_xxxxxxxx@ingest.replaypilot.com/1" });
```

Use your project's public key in place of `pk_live_xxxxxxxx`. The trailing
`/1` is a shape the Sentry SDK expects; ReplayPilot's ingest endpoint ignores
its value.

## License

MIT
