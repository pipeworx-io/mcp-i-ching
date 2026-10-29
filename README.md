# @pipeworx/i-ching

Cast the I Ching with the traditional three-coin or yarrow-stalk method, or
look up any of the 64 hexagrams (King Wen sequence) directly. Every hexagram's
judgment, image and six line texts are original text written for this pack.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1856+ live data sources. This is an independent, unofficial integration — not affiliated with, endorsed by, or published by the upstream provider.

## Tools

- `cast_i_ching({ method?, question?, seed? })` — casts six lines (coins by
  default, or yarrow), returns the primary hexagram, any changing lines with
  their texts, and the resulting hexagram after those lines flip (`null` if
  none changed). `seed` is always returned at the top level of the result;
  pass it back with the same `method` to replay the exact cast. `meta` carries
  the shared chance-engine envelope (`seed`, `procedure`, `deck`, `source`) for
  citation, matching the convention used across this pack family (e.g.
  `dice-roller`). `question` is echoed back verbatim and never interpreted —
  the calling agent reads the hexagram and line texts and draws its own
  conclusion.
- `get_hexagram({ number?, name? })` — full text for one hexagram by King Wen
  number (1-64) or by name (Chinese, pinyin, or the English gloss used here).
- `search_hexagrams({ query })` — free-text search over names and keywords
  (e.g. "thunder", "patience", "withdrawal"); returns short summaries, use
  `get_hexagram` for the full text of a match.

## Auth

Keyless. No upstream, no API key, no COGS.

## Content and sourcing

All 64 hexagrams are inline in this pack (`src/hexagrams.ts`, ~70 KB — well
under the 150 KB threshold where content moves to KV per
`workers/gateway/src/pack-baked-indexes.json`).

- The King Wen hexagram number, the Chinese name, the pinyin romanization, and
  the six binary lines (bottom to top; a line is yang/solid or yin/broken) and
  their trigram composition are traditional, structural facts reproduced
  across every edition of the text — not any translator's copyrighted
  expression.
- The English hexagram name, the judgment, the image, and all six line texts
  are **original wording**, written for this pack. **James Legge's 1899
  translation** ("The Yi King", *Sacred Books of the East* vol. 16) is the
  public-domain reference used for the underlying meaning of each hexagram and
  line. This pack never reproduces Wilhelm/Baynes ("The I Ching or Book of
  Changes", still under copyright) or any other modern commercial
  translation's wording.
- Coin-toss probabilities (6/7/8/9 at 1/8, 3/8, 3/8, 1/8) and yarrow-stalk
  probabilities (1/16, 5/16, 7/16, 3/16) are the standard, well-documented
  results of each traditional counting method, not anyone's expression.
- Meanings are traditional; the calling agent interprets them for its own
  question. Every tool description says this, so the result reads as
  structured material to reason over, not as advice delivered by the tool.

## Randomness

Real randomness via the shared chance engine (`@pipeworx/shared`'s
`makeRng`/`rollWeighted`), not a model pretending to cast coins. `seed` is
optional on `cast_i_ching` and always returned, so the same seed and method
reproduce the same cast exactly. No session/deck-draw state is used here —
unlike the tarot or random-tables packs, a cast is a single self-contained
roll of six independent lines each time, so there is nothing to carry across
calls and this pack does not request KV injection.

## Errors

A hexagram number outside 1-64, a name that matches nothing, or a search query
with no matches are all loud errors naming the valid range or offering
examples/keywords to try — never a silent empty result.

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "i-ching": {
      "url": "https://gateway.pipeworx.io/i-ching/mcp"
    }
  }
}
```

### What this endpoint actually serves

`tools/list` at `https://gateway.pipeworx.io/i-ching/mcp` returns the tools in the table
above **plus the shared Pipeworx meta-tools** — `ask_pipeworx`,
`discover_tools`, `search_within`, `remember`/`recall` and the rest of the
gateway-wide set. So the tool count you see is larger than this table: a
single-pack endpoint currently lists roughly 30 shared tools alongside the
pack's own. The connection's `initialize` response states its exact scope, and
is the authoritative answer for a given day.

This is deliberate, not multiplexing by accident. The meta-tools are what let a
scoped connection answer a question this pack does not cover — via
`ask_pipeworx`, which routes across the whole catalog — without you adding a
second MCP server. There is currently no way to mount a pack endpoint without
them; if the extra schemas cost you more context than the routing is worth,
connect to the full gateway once rather than to several pack endpoints.

Or connect to the full Pipeworx gateway to get every pack's tools listed
directly, instead of just this one's:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

Both URLs reach the same gateway and the same 1856+ data sources. The
only difference is which pack's tools are listed **directly**; `ask_pipeworx`
reaches all of them from either one.

## No MCP client? Call it over HTTP

```bash
curl -X POST https://gateway.pipeworx.io/v1/tools/cast_i_ching \
  -H 'Content-Type: application/json' \
  -d '{"method":"coins","question":"Should we ship the chance-pack family?","seed":"pipeworx-iching-smoke-1"}'
```

No account needed for the first calls. Inspect any tool: `GET https://gateway.pipeworx.io/v1/tools/cast_i_ching`. Find one: `POST https://gateway.pipeworx.io/v1/tools/search_packs` with `{"query":"..."}`.

## Run it from npm

`@pipeworx/mcp-i-ching` is a local stdio bridge to the Pipeworx gateway: your MCP client
starts it with `npx`, and it forwards every call to the same
`https://gateway.pipeworx.io/i-ching/mcp` endpoint shown above. It needs network access;
there is no offline mode.

```json
{
  "mcpServers": {
    "i-ching": {
      "command": "npx",
      "args": ["-y", "@pipeworx/mcp-i-ching"]
    }
  }
}
```

Without a key it calls anonymously, capped at 50 calls a day. A free account
raises that to 200 a day: get a key at https://pipeworx.io/signup and add
`"env": { "PIPEWORX_API_KEY": "<your key>" }` to the server entry.
The key is sent as a Bearer token, the same way a hosted connection sends it,
so calls are metered and billed exactly as they are there.

It lists **only** this pack's tools by default. Set `PIPEWORX_META_TOOLS=1` to
also list `ask_pipeworx` and the other gateway-wide tools.

Behind an HTTPS proxy: Node's built-in `fetch` does not read `HTTPS_PROXY` by
default. Newer Node releases honour it when `NODE_USE_ENV_PROXY=1` is set; check
your Node version's documentation.

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English —
this works on the pack endpoint above as well as on the full gateway:

```
ask_pipeworx({ question: "your question about I Ching data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
