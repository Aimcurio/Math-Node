import { spawnSync } from "node:child_process";

const commands = [
  [".\\node_modules\\.bin\\tsc.cmd", ["--noEmit"]],
  [".\\node_modules\\.bin\\tsx.cmd", ["tests\\math-core.test.ts"]],
  [".\\node_modules\\.bin\\tsx.cmd", ["tests\\validate-wolfram-fixtures.test.ts"]],
  [".\\node_modules\\.bin\\tsx.cmd", ["tests\\validate-literature-candidates.test.ts"]],
  [".\\node_modules\\.bin\\tsx.cmd", ["tests\\fixture-boundary.test.ts"]],
  [".\\node_modules\\.bin\\vite.cmd", ["build"]]
] as const;

for (const [command, args] of commands) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: true
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("all local checks passed");
