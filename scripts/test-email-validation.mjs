import { validateEmailFormat } from "../lib/validation/email.js";

const mustFail = [
  "name@gmail.com.com",
  "name@gmial.com",
  "name@gmail.co",
  "name@@gmail.com",
  "name@gmail",
  "name gmail.com",
  "name@example.con",
];

const mustPass = ["name@gmail.com", "name@company.co.uk"];

console.log("=== Format-only (must fail) ===");
for (const raw of mustFail) {
  const r = validateEmailFormat(raw);
  console.log(raw, "→", r.ok ? "UNEXPECTED PASS" : "fail", r.suggestion || "");
}

console.log("\n=== Format-only (must pass) ===");
for (const raw of mustPass) {
  const r = validateEmailFormat(raw);
  console.log(raw, "→", r.ok ? `pass (${r.normalized})` : `UNEXPECTED FAIL ${JSON.stringify(r)}`);
}

