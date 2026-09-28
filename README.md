# coldcalling

Cold-call tracker for restaurant website outreach. Pick a city, work through the leads that have no
website, and tick what happened on every call.

## What it does

- Filter leads by country, city, restaurant type, website status, or a free text search
- Tick any number of call outcomes per lead: no answer, WhatsApp sent, owner not there, busy call
  later, will tell tomorrow, already asked someone, not interested, agreed, deal done
- Every tick saves on its own and survives a reload, so one outcome never replaces another
- Leads that already have a website are shown but locked, since there is nothing to sell them
- Call days of 50 leads each, with a success dialog when a day is cleared
- Report view with each outcome as a share of contacted leads

## Stack

React 19, Vite, Tailwind CSS 3, MUI v9 DataGrid, axios.

## Run it

```bash
npm install
cp .env.example .env
npm run dev
```

## Configuration

| Variable | What it is |
| --- | --- |
| `VITE_API_URL` | Base URL of the lead API. Defaults to `http://localhost:5000`. |

The API is a separate Express and MongoDB service, so set `VITE_API_URL` to its public URL before
deploying. Without a reachable API the app shows a "Server not responding" screen with a retry button.
