# Contracts: 018 – Activities: Achievements (Awards)

## Portfolio JSON patch (private override) contract

This repo supports overriding `publicPortfolio` with a **Partial\<Portfolio\>** patch via:

- `PORTFOLIO_PRIVATE_JSON`, or
- `PORTFOLIO_PRIVATE_URL` (Apps Script / JSON endpoint)

For this feature, the patch may include `activities.groups` with the new group name.

### Important: `groups` replaces the whole list

In this codebase, private overrides are merged shallowly:

- `activities: { ...base.activities, ...patch.activities }`

So if you provide `activities.groups`, it will **replace the entire groups array** (it does not deep-merge group items).

**Recommendation**: If you override `activities.groups`, include *all* groups you want to show (Talks/Books/Community/Achievements) in the desired order.

### Example (recommended): include all groups

```json
{
  "activities": {
    "heading": "Activities",
    "groups": [
      {
        "name": "Talks",
        "items": []
      },
      {
        "name": "Books",
        "items": []
      },
      {
        "name": "Community",
        "items": []
      },
      {
        "name": "Achievements",
        "items": [
          {
            "year": "2024",
            "title": "Example Award",
            "context": "Optional context",
            "link": { "label": "Details", "href": "https://example.com" }
          }
        ]
      }
    ]
  }
}
```

### `activities.groups[].name` allowed values

- `Talks`
- `Books`
- `Community`
- `Achievements` (**new**)

## Spreadsheet (Apps Script) contract

Out of scope for this feature: the current Apps Script exporter only supports `experience` + `projects`.


