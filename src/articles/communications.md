---
title: "Self-hosting your group's communications"
date: 2026-09-23
tags: ["communications", "opsec", "self-hosting"]
summary: "What the corporate chat and video tools actually offer, what running your own gets you instead, and why none of it replaces being in the same room."
---

Start with the thing this article is not going to tell you: that the right chat app will make your group secure, or that switching platforms is itself a form of organizing. It isn't. A room full of people who trust each other, talking face to face, is still the most secure and the most human way to coordinate anything. No transport layer, no encryption scheme, and no self-hosted instance changes that. What technology-mediated communication actually buys you is *reach* — the ability to include the person who moved three states away, coordinate across a city faster than a phone tree, or keep a project alive between the in-person meetings that are still doing the real work. Everything below is about making that reach less costly, not about replacing what it's standing in for.

## Start with a threat model, not a tool

"Which app should we use" is the second question. The first is: **who are we trying to keep our communication safe from, and what would it cost us if they got it?**

For most groups, that's not a cinematic adversary. It's more often:

- **The platform itself**, harvesting metadata and content to sell attention, even when it isn't reading your messages directly.
- **Deplatforming** — a group, page, or account getting suspended or shut down because a ToS was written to let the company do that whenever it wants, for reasons that have nothing to do with you.
- **Legal exposure** — a company handing over messages, metadata, or account records because a subpoena landed on their desk, in whatever jurisdiction they're incorporated in.
- **Infiltration** — someone with bad intent simply joining the group, which no encryption protocol on earth prevents. This one is a people problem, not a tech problem, and it's worth saying plainly: op-sec culture that focuses entirely on tools while ignoring who's actually in the room is solving the wrong half of the problem.

Notice that "someone reads the content of my messages" is often the *least* likely risk on that list, and yet it's the one most tool comparisons obsess over. Metadata — who talked to whom, when, how often, in what group — is frequently more revealing than content, and it's the thing plain end-to-end encryption does the least to protect, because the server generally still has to know who's delivering to whom.

Once you know what you're actually defending against, the tool question gets a lot easier to answer.

## What kind of communication do you actually need?

Before comparing tools, it's worth separating out what you're actually trying to do — because "communication" isn't one problem, and the tool that's right for one kind is often wrong for another.

- **Broadcast (one-to-many, public-facing)** — event announcements, public statements, things meant to be read widely. This needs the widest possible reach and the least friction to receive, not the most privacy. The main risk here isn't exposure of content — it's public by design — it's exposing more about who's behind it, or who's engaging with it, than you meant to.
- **Group coordination (many-to-many, ongoing)** — the day-to-day of running something: logistics, decisions, who's doing what. This is where most groups actually spend their time, and it needs persistence (a searchable history people can catch up on) and tolerance for asynchronous participation, since nobody's available all at once. Moderate privacy — internal, not secret — is usually enough.
- **Real-time voice or video (synchronous)** — meetings, trainings, anything where back-and-forth needs to move faster than typing allows, or where tone and nuance matter. A live conversation is harder to misquote or screenshot out of context than text, but it also creates a moment where everyone's presence and timing is knowable in a way async text isn't.
- **Sensitive small-group discussion (high-privacy)** — strategy, safety concerns, anything where a leak has real consequences for real people. This is where metadata protection and resistance to infiltration matter most, and where convenience should be the *last* thing you optimize for, not the first.
- **Off-grid or infrastructure-denial** — situations where the internet or cell network is unavailable, unreliable, or deliberately cut. The tradeoff here isn't really about privacy at all — it's about what still works when nothing else does.

None of this is about finding one tool that does everything. It's usually healthier for a group to use a different tool for each of these than to force one app to be the broadcast channel, the meeting space, and the place where sensitive planning happens — because the privacy and reach needs of those three things actively pull in opposite directions.

## What the corporate defaults offer

Most groups default to whatever's already installed on everyone's phone: Slack or Discord for text, WhatsApp or Messenger for looser coordination, Zoom or Google Meet for video. That's not a mistake — it's the tools working exactly as designed.

**What they actually offer:**
- Zero setup cost or maintenance — someone else runs the servers, patches the bugs, and keeps the lights on.
- Reliability and polish that a volunteer-run server usually can't match on day one.
- Near-zero onboarding friction, because everyone already has the app.
- Cross-platform support that "just works" everywhere.

**What that convenience costs you:**
- Your group's membership, activity patterns, and content sit on servers you don't control, governed by a ToS you didn't write and a jurisdiction you didn't choose.
- The company can suspend, rate-limit, or delete your group unilaterally — no appeal required, no notice guaranteed.
- Even where content is encrypted (WhatsApp, for instance, does encrypt message content end-to-end), the platform still typically retains rich metadata: who's in the group, when messages moved, device and contact-graph information — and that metadata is exactly what a legal request or a data breach exposes.
- The business model, in almost every case, is attention and data. You are not the customer.

None of this makes these tools unusable for low-stakes coordination — a public event announcement doesn't need the same handling as internal strategy discussion. But it's worth being honest that "free" here means *you and your group's data are the product*, and that a platform's convenience is inseparable from its control over whether your group gets to keep existing on it.

## Self-hosted, federated alternatives

Self-hosting flips the first bullet list above: you take on the maintenance burden, in exchange for actually owning the infrastructure. A few that fit different needs:

- **[Matrix](https://matrix.org/)** (client: Element, among others) — an open, federated chat protocol. Your server talks to other Matrix servers the way email servers talk to each other, so a group can be self-hosted *and* still reachable by anyone else on the network, without everyone needing an account on your specific server. Supports optional end-to-end encryption, voice, and video. This is probably the best general-purpose starting point for a group chat that wants to federate with other like-minded projects rather than live in an island.
- **[Mattermost](https://mattermost.com/)** or **[Rocket.Chat](https://rocket.chat/)** — Slack-shaped self-hosted team chat. Good fit if your group's workflow is already built around channels, threads, and integrations and you want the migration to feel familiar.
- **[Jitsi Meet](https://jitsi.org/)** — self-hostable video calls, no account required to join a room. A solid Zoom replacement for anything from a two-person check-in to a full meeting.
- **[Mumble](https://www.mumble.info/)** — low-latency, self-hosted voice chat. Built originally for gaming, but that also means it's built to handle many people talking with minimal lag, which suits a live working session better than most video tools do.

Federation is the part worth underlining: self-hosting doesn't have to mean isolating. A Matrix server you run can still talk to a Matrix server someone else runs. That's the whole point of building this as infrastructure other groups can stand up themselves and connect to, rather than a single service everyone has to depend on ATP² to keep alive.

The honest tradeoff: someone has to actually run the server — apply updates, handle abuse/spam, keep backups, pay for hosting. That's real, ongoing work, and it's worth deciding as a group who's doing it and what happens if they burn out or disappear, before you're relying on it for anything that matters.

## Other alternatives (not self-hosted, not surveillance-funded)

Not every group has the capacity to run a server, and that's fine — self-hosting is one option, not a purity test. A few tools that aren't corporate-surveillance-funded even though you're not the one operating them:

- **[Signal](https://signal.org/)** — strong end-to-end encryption and a genuine non-profit structure, and it remains the easiest recommendation for someone who "just wants an app that isn't harvesting them." Worth knowing its real limitation: Signal is deliberately **not federated** — its own team has been explicit that they don't want third-party clients or independently run servers talking to the Signal network — so you're still trusting one central organization, and it still requires a phone number to sign up. Good default for individuals; not a self-hostable piece of your own infrastructure.
- **[SimpleX Chat](https://simplex.chat/)** — takes a genuinely different approach: it assigns no persistent identifier to users at all, not even an anonymous one, so there's no account for a server (or an observer) to correlate across your different conversations. You can also point it at your own relay servers if you want to take on some of that infrastructure without running a full federated deployment.
- **[Briar](https://briarproject.org/)** — built for the case where you can't rely on central infrastructure existing at all: it syncs peer-to-peer over Tor, Wi-Fi, or Bluetooth, with no server in the loop by default. Slower and less convenient than everything above, and worth it specifically when convenience is not the priority.

For anything fully off-grid — no internet, no cell service — see the [Meshtastic guide](/knowledgebase/meshtastic-basics/) already on this site. It's a different tradeoff again: short text and location only, but it keeps working when every option above stops.

## Matching the tool to the group

A rough way to think about it, roughly in order of how much infrastructure and friction it costs you:

1. **Public-facing announcements, low stakes** — whatever's easiest for the audience to receive. Reach matters more than op-sec here.
2. **Internal coordination for a group with normal privacy expectations** — a self-hosted Matrix (or Mattermost/Rocket.Chat) server is the sweet spot: real control, federation for reach, and a UX close enough to what people already know.
3. **Individuals who want a strong default with zero setup** — Signal, understanding its centralization tradeoff.
4. **High-sensitivity metadata concerns, small trusted group** — SimpleX Chat.
5. **No trust in any available infrastructure, or infrastructure itself is compromised/unavailable** — Briar, or Meshtastic for fully offline.

None of these tiers fix a group that hasn't talked honestly about who's in the room and what they're actually worried about. Pick the tool after that conversation, not instead of it — and remember that the conversation itself, held in person whenever it can be, is doing more for your group's security than any app on this list ever will.

## Matching the tool to the group #2

Map the tool to the *kind* of communication, not just to "how sensitive is this":

1. **Broadcast** — whatever's easiest for the audience to receive. Reach matters more than op-sec here.
2. **Group coordination** — a self-hosted Matrix (or Mattermost/Rocket.Chat) server is the sweet spot: real control, federation for reach, and a UX close enough to what people already know.
3. **Synchronous voice/video** — self-hosted Jitsi or Mumble for groups that can run them; Signal for individuals who want a strong default with zero setup.
4. **Sensitive small-group discussion** — SimpleX Chat, where metadata protection matters more than convenience.
5. **Off-grid** — Briar, or Meshtastic for fully offline.