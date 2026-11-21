import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Dev-only replacement for the artifact "actions" endpoint that App.tsx calls
 * (fetch("actions", { action: "records.list" | "records.create" })).
 * Records live in memory for the dev-server session.
 */
function localRecordsApi(): Plugin {
  type StoredRow = { id: string; value: unknown };
  const store = new Map<string, StoredRow[]>();

  return {
    name: "local-records-api",
    configureServer(server) {
      server.middlewares.use("/actions", (req, res) => {
        res.setHeader("content-type", "application/json; charset=utf-8");

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => {
          try {
            const { action, args } = JSON.parse(body || "{}");
            const collection: string = args?.collection ?? "default";
            const rows = store.get(collection) ?? [];
            store.set(collection, rows);

            if (action === "records.list") {
              const limit = Number(args?.limit ?? 100);
              res.end(
                JSON.stringify({
                  data: { records: rows.slice(0, Number.isFinite(limit) ? limit : 100) },
                }),
              );
              return;
            }

            if (action === "records.create") {
              const row: StoredRow = {
                id: crypto.randomUUID(),
                value: args?.value,
              };
              rows.unshift(row);
              res.end(JSON.stringify({ data: row }));
              return;
            }

            res.statusCode = 400;
            res.end(JSON.stringify({ error: `Unknown action: ${String(action)}` }));
          } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(error) }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localRecordsApi()],
  server: {
    port: 5173,
  },
});
