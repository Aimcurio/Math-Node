# Math Node Prototype

This repository contains the NOESIS Math Node prototype. The current development target is a deterministic, model-agnostic math core with serializable capability metadata and local implementation references.

Wolfram may be used only as an offline development-time fixture oracle. Runtime code and browser UI must not import or call Wolfram.

The runtime is modular: new deterministic capability families should be added as capability modules, not by editing the runtime execution path.

Fixture and benchmark workflow:

- `docs/fixture-pipeline.md`
- `docs/benchmark_coverage.md`

## Run Locally

Prerequisite: Node.js.

1. Install dependencies with `npm install`.
2. Run `npm run dev`.
3. Run core verification with `npm run test:core`.
4. Run offline fixture validation with `npm run test:fixtures`.
5. Run literature candidate validation with `npm run test:candidates`.
6. Run fixture boundary validation with `npm run test:boundary`.
7. Run the local full gate with `npm run test:all`.
