// Google Apps Script (Web App) - Bearer-protected JSON for portfolio overrides
//
// Setup:
// - Script Properties: BEARER_TOKEN = random long string
// - Deploy as Web App: Execute as Me, Access Anyone (Bearer guards access)
//
// Sheets:
// - "experience": headers [year, text]
// - "projects": headers:
//   [visibility,title,summary,role,tech,outcomeOrLearning,status,linkLabel,linkHref]

const SHEET_EXPERIENCE = "experience";
const SHEET_PROJECTS = "projects";

function getBearerToken_() {
  return PropertiesService.getScriptProperties().getProperty("BEARER_TOKEN");
}

function unauthorized_(status, body) {
  const output = ContentService.createTextOutput(JSON.stringify(body));
  output.setMimeType(ContentService.MimeType.JSON);
  // Note: ContentService doesn't support setting HTTP status codes directly.
  // Clients should treat this as an error based on the response body.
  return output;
}

function assertAuthorized_(e) {
  const header =
    (e && e.headers && (e.headers.Authorization || e.headers.authorization)) || "";
  const token = getBearerToken_();
  if (!token) return { ok: false, body: { error: "Server not configured" } };
  if (header !== `Bearer ${token}`) return { ok: false, body: { error: "Unauthorized" } };
  return { ok: true };
}

function sheetToObjects_(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(String);
  return values.slice(1).map((row) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = row[i];
    });
    return obj;
  });
}

function normalizeExperience_(rows) {
  return rows
    .filter((r) => r.year && r.text)
    .map((r) => ({
      year: String(r.year),
      text: String(r.text),
    }));
}

function normalizeProjects_(rows) {
  return rows
    .filter((r) => r.title)
    .map((r) => {
      const visibility = r.visibility ? String(r.visibility) : "public";
      return {
        visibility,
        title: String(r.title),
        summary: String(r.summary || ""),
        role: String(r.role || ""),
        tech: String(r.tech || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        outcomeOrLearning: String(r.outcomeOrLearning || ""),
        status: r.status ? String(r.status) : undefined,
        link:
          r.linkHref && r.linkLabel
            ? { href: String(r.linkHref), label: String(r.linkLabel) }
            : undefined,
      };
    });
}

function doGet(e) {
  const auth = assertAuthorized_(e);
  if (!auth.ok) return unauthorized_(401, auth.body);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const expSheet = ss.getSheetByName(SHEET_EXPERIENCE);
  const projSheet = ss.getSheetByName(SHEET_PROJECTS);
  if (!expSheet || !projSheet) {
    return unauthorized_(400, {
      error: "Missing sheets",
      required: [SHEET_EXPERIENCE, SHEET_PROJECTS],
    });
  }

  const expRows = sheetToObjects_(expSheet);
  const projRows = sheetToObjects_(projSheet);

  // Return Partial<Portfolio> (only the parts you want to override)
  const payload = {
    experience: {
      heading: "Experience",
      highlights: normalizeExperience_(expRows),
    },
    projects: {
      heading: "Projects",
      items: normalizeProjects_(projRows),
    },
  };

  const output = ContentService.createTextOutput(JSON.stringify(payload));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}


