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

ReplayPilot records sessions, not exceptions. Pair it with
[Sentry](https://sentry.io) for stack traces and alerting.

```sh
npm install @sentry/browser
```

```ts
import * as Sentry from "@sentry/browser";

Sentry.init({ dsn: "https://xxxxxxxx@sentry.replaypilot.com/1" });
```

## License

MIT
