import { Expr } from './Types';

export function parse(input: string): Expr {
  let pos = 0;
  const s = input.replace(/\s+/g, '');

  function parseExpr(): Expr {
    let node = parseTerm();
    while (pos < s.length) {
      if (s[pos] === '+') {
        pos++;
        node = { type: 'Add', left: node, right: parseTerm() };
      } else if (s[pos] === '-') {
        pos++;
        node = { type: 'Subtract', left: node, right: parseTerm() };
      } else {
        break;
      }
    }
    return node;
  }

  function parseTerm(): Expr {
    let node = parseFactor();
    while (pos < s.length) {
      if (s[pos] === '*') {
        pos++;
        node = { type: 'Multiply', left: node, right: parseFactor() };
      } else if (s[pos] === '/') {
        pos++;
        node = { type: 'Divide', left: node, right: parseFactor() };
      } else if (startsPrimary(s[pos])) {
        node = { type: 'Multiply', left: node, right: parseFactor() };
      } else {
        break;
      }
    }
    return node;
  }

  function parseFactor(): Expr {
    if (s[pos] === '-') {
      pos++;
      return { type: 'Negate', value: parseFactor() };
    }
    if (s[pos] === '+') {
      pos++;
      return parseFactor();
    }

    let node = parsePrimary();
    if (pos < s.length && s[pos] === '^') {
      pos++;
      node = { type: 'Power', base: node, exponent: parseFactor() };
    }
    return node;
  }

  function parsePrimary(): Expr {
    if (pos >= s.length) throw new Error("Unexpected end of input");
    const c = s[pos];
    if (c === '(') {
      pos++;
      const node = parseExpr();
      if (s[pos] !== ')') throw new Error("Expected )");
      pos++;
      return node;
    }
    if (/[a-zA-Z]/.test(c)) {
      let name = '';
      while (pos < s.length && /[a-zA-Z]/.test(s[pos])) {
        name += s[pos++];
      }
      if (name.length > 1 && s[pos] === '(') {
        throw new Error(`Function calls are not supported: ${name}`);
      }
      return { type: 'Variable', name };
    }
    if (/[0-9]/.test(c) || c === '.') {
      let numStr = '';
      while (pos < s.length && (/[0-9]/.test(s[pos]) || s[pos] === '.')) {
        numStr += s[pos++];
      }
      return { type: 'Number', value: parseFloat(numStr) };
    }
    throw new Error(`Unexpected character: ${c}`);
  }

  function startsPrimary(c: string | undefined): boolean {
    return c === '(' || c === '.' || !!c && /[a-zA-Z0-9]/.test(c);
  }

  const result = parseExpr();
  if (pos < s.length) throw new Error(`Unexpected character at end: ${s[pos]}`);
  return result;
}

export function format(expr: Expr): string {
  switch (expr.type) {
    case 'Number': return expr.value.toString();
    case 'Variable': return expr.name;
    case 'Negate': {
      const inner = expr.value.type === 'Number' || expr.value.type === 'Variable' || expr.value.type === 'Power'
        ? format(expr.value)
        : `(${format(expr.value)})`;
      return `-${inner}`;
    }
    case 'Add': return `${format(expr.left)} + ${format(expr.right)}`;
    case 'Subtract': return `${format(expr.left)} - ${format(expr.right)}`;
    case 'Multiply': {
      const leftStr = needsTermParens(expr.left) ? `(${format(expr.left)})` : format(expr.left);
      const rightStr = needsTermParens(expr.right) ? `(${format(expr.right)})` : format(expr.right);
      return `${leftStr}*${rightStr}`;
    }
    case 'Divide': {
      const leftStr = needsTermParens(expr.left) ? `(${format(expr.left)})` : format(expr.left);
      const rightStr = needsTermParens(expr.right) ? `(${format(expr.right)})` : format(expr.right);
      return `${leftStr}/${rightStr}`;
    }
    case 'Power': {
      const leftStr = expr.base.type === 'Number' || expr.base.type === 'Variable' ? format(expr.base) : `(${format(expr.base)})`;
      const rightStr = expr.exponent.type === 'Number' || expr.exponent.type === 'Variable' || expr.exponent.type === 'Negate' ? format(expr.exponent) : `(${format(expr.exponent)})`;
      return `${leftStr}^${rightStr}`;
    }
  }
}

function needsTermParens(expr: Expr): boolean {
  return expr.type === 'Add' || expr.type === 'Subtract';
}

export function evaluate(expr: Expr, vars: Record<string, number> = {}): number {
  switch (expr.type) {
    case 'Number': return expr.value;
    case 'Variable':
      if (vars[expr.name] === undefined) throw new Error(`Undefined variable: ${expr.name}`);
      return vars[expr.name];
    case 'Negate': return -evaluate(expr.value, vars);
    case 'Add': return evaluate(expr.left, vars) + evaluate(expr.right, vars);
    case 'Subtract': return evaluate(expr.left, vars) - evaluate(expr.right, vars);
    case 'Multiply': return evaluate(expr.left, vars) * evaluate(expr.right, vars);
    case 'Divide': return evaluate(expr.left, vars) / evaluate(expr.right, vars);
    case 'Power': return Math.pow(evaluate(expr.base, vars), evaluate(expr.exponent, vars));
  }
}

export function normalize(expr: Expr): Expr {
  return simplify(expr);
}

export function canonicalize(expr: Expr): Expr {
  const simplified = simplify(expr);

  switch (simplified.type) {
    case 'Number':
    case 'Variable':
      return simplified;
    case 'Negate':
      return { type: 'Negate', value: canonicalize(simplified.value) };
    case 'Add':
      return buildAssociative('Add', collectAssociative('Add', simplified).map(canonicalize));
    case 'Multiply':
      return buildAssociative('Multiply', collectAssociative('Multiply', simplified).map(canonicalize));
    case 'Subtract':
      return { type: 'Subtract', left: canonicalize(simplified.left), right: canonicalize(simplified.right) };
    case 'Divide':
      return { type: 'Divide', left: canonicalize(simplified.left), right: canonicalize(simplified.right) };
    case 'Power':
      return { type: 'Power', base: canonicalize(simplified.base), exponent: canonicalize(simplified.exponent) };
  }
}

export function canonicalKey(expr: Expr): string {
  return JSON.stringify(canonicalize(expr));
}

function collectAssociative(type: 'Add' | 'Multiply', expr: Expr): Expr[] {
  if (expr.type !== type) return [expr];
  return [
    ...collectAssociative(type, expr.left),
    ...collectAssociative(type, expr.right)
  ];
}

function buildAssociative(type: 'Add' | 'Multiply', terms: Expr[]): Expr {
  const sorted = terms.sort((left, right) => canonicalSortKey(left).localeCompare(canonicalSortKey(right)));
  return sorted.slice(1).reduce<Expr>(
    (left, right) => ({ type, left, right }),
    sorted[0]
  );
}

function canonicalSortKey(expr: Expr): string {
  return JSON.stringify(expr);
}

export function simplify(expr: Expr): Expr {
  switch (expr.type) {
    case 'Number':
    case 'Variable':
      return expr;
    case 'Negate': {
      const value = simplify(expr.value);
      if (value.type === 'Number') return { type: 'Number', value: -value.value };
      if (value.type === 'Negate') return value.value;
      if (value.type === 'Multiply' && value.left.type === 'Number') {
        return simplify({ type: 'Multiply', left: { type: 'Number', value: -value.left.value }, right: value.right });
      }
      return { type: 'Negate', value };
    }
    case 'Add': {
      const left = simplify(expr.left);
      const right = simplify(expr.right);
      if (left.type === 'Number' && left.value === 0) return right;
      if (right.type === 'Number' && right.value === 0) return left;
      if (left.type === 'Number' && right.type === 'Number') return { type: 'Number', value: left.value + right.value };
      if (left.type === 'Negate') return simplify({ type: 'Subtract', left: right, right: left.value });
      if (right.type === 'Negate') return simplify({ type: 'Subtract', left, right: right.value });
      
      return { type: 'Add', left, right };
    }
    case 'Subtract': {
      const left = simplify(expr.left);
      const right = simplify(expr.right);
      if (right.type === 'Number' && right.value === 0) return left;
      if (left.type === 'Number' && right.type === 'Number') return { type: 'Number', value: left.value - right.value };
      if (canonicalKey(left) === canonicalKey(right)) return { type: 'Number', value: 0 };
      return { type: 'Subtract', left, right };
    }
    case 'Multiply': {
      const left = simplify(expr.left);
      const right = simplify(expr.right);
      if (left.type === 'Number' && left.value === 0) return { type: 'Number', value: 0 };
      if (right.type === 'Number' && right.value === 0) return { type: 'Number', value: 0 };
      if (left.type === 'Number' && left.value === 1) return right;
      if (right.type === 'Number' && right.value === 1) return left;
      if (left.type === 'Number' && left.value === -1) return simplify({ type: 'Negate', value: right });
      if (right.type === 'Number' && right.value === -1) return simplify({ type: 'Negate', value: left });
      if (left.type === 'Number' && right.type === 'Number') return { type: 'Number', value: left.value * right.value };
      
      // c * (d * x) -> (c*d) * x
      if (left.type === 'Number' && right.type === 'Multiply' && right.left.type === 'Number') {
         return { type: 'Multiply', left: { type: 'Number', value: left.value * right.left.value }, right: right.right };
      }
      if (left.type === 'Multiply' && left.left.type === 'Number' && right.type === 'Number') {
         return { type: 'Multiply', left: { type: 'Number', value: left.left.value * right.value }, right: left.right };
      }

      // simplify x*c to c*x for standardization
      if (left.type === 'Variable' && right.type === 'Number') return { type: 'Multiply', left: right, right: left };
      
      return { type: 'Multiply', left, right };
    }
    case 'Divide': {
      const left = simplify(expr.left);
      const right = simplify(expr.right);
      if (left.type === 'Number' && left.value === 0) return { type: 'Number', value: 0 };
      if (right.type === 'Number' && right.value === 1) return left;
      if (left.type === 'Number' && right.type === 'Number') return { type: 'Number', value: left.value / right.value };
      return { type: 'Divide', left, right };
    }
    case 'Power': {
      const base = simplify(expr.base);
      const exponent = simplify(expr.exponent);
      if (exponent.type === 'Number' && exponent.value === 1) return base;
      if (exponent.type === 'Number' && exponent.value === 0) return { type: 'Number', value: 1 };
      if (base.type === 'Number' && base.value === 0) return { type: 'Number', value: 0 };
      if (base.type === 'Number' && base.value === 1) return { type: 'Number', value: 1 };
      if (base.type === 'Number' && exponent.type === 'Number') return { type: 'Number', value: Math.pow(base.value, exponent.value) };
      return { type: 'Power', base, exponent };
    }
  }
}

export function differentiate(expr: Expr, variable: string = 'x'): Expr {
  switch (expr.type) {
    case 'Number': return { type: 'Number', value: 0 };
    case 'Variable': return { type: 'Number', value: expr.name === variable ? 1 : 0 };
    case 'Negate': return { type: 'Negate', value: differentiate(expr.value, variable) };
    case 'Add': return { type: 'Add', left: differentiate(expr.left, variable), right: differentiate(expr.right, variable) };
    case 'Subtract': return { type: 'Subtract', left: differentiate(expr.left, variable), right: differentiate(expr.right, variable) };
    case 'Multiply':
      // Product rule: d(uv) = u'v + uv'
      return {
        type: 'Add',
        left: { type: 'Multiply', left: differentiate(expr.left, variable), right: expr.right },
        right: { type: 'Multiply', left: expr.left, right: differentiate(expr.right, variable) }
      };
    case 'Divide':
      // Quotient rule: d(u/v) = (u'v - uv')/v^2
      return {
        type: 'Divide',
        left: {
          type: 'Subtract',
          left: { type: 'Multiply', left: differentiate(expr.left, variable), right: expr.right },
          right: { type: 'Multiply', left: expr.left, right: differentiate(expr.right, variable) }
        },
        right: { type: 'Power', base: expr.right, exponent: { type: 'Number', value: 2 } }
      };
    case 'Power':
      // Chain rule for power: d(u^n) = n * u^(n-1) * u'
      if (expr.exponent.type === 'Number') {
        const n = expr.exponent.value;
        const newExponent = { type: 'Number', value: n - 1 } as Expr;
        const du = differentiate(expr.base, variable);
        return {
          type: 'Multiply',
          left: {
            type: 'Multiply',
            left: { type: 'Number', value: n },
            right: { type: 'Power', base: expr.base, exponent: newExponent }
          },
          right: du
        };
      }
      throw new Error("Differentiation of variable exponents not yet supported.");
  }
}
