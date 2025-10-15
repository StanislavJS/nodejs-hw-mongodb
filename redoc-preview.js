import { execSync } from "child_process";

try {
  execSync("npx @redocly/cli@latest preview --product=redoc -d docs", { stdio: "inherit" });
} catch (err) {
  console.error("❌ Redocly preview failed:", err.message);
}
