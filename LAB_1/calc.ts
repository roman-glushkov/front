// Функция только для вычислений
function calculate(expression: string): { result: number; error?: string } {
  if (!expression.trim()) {
    return { result: 0, error: "Пустое выражение" };
  }

  let expr = expression.replace(/\s+/g, " ").trim();

  while (expr.includes("(")) {
    const open = expr.lastIndexOf("(");
    const close = expr.indexOf(")", open);

    if (close === -1) {
      return { result: 0, error: "Не хватает закрывающей скобки" };
    }

    const inside = expr.slice(open + 1, close);

    if (!inside.trim()) {
      return { result: 0, error: "Пустые скобки" };
    }

    const innerResult = calculate(inside);
    if (innerResult.error) {
      return innerResult;
    }

    expr = expr.slice(0, open) + innerResult.result + expr.slice(close + 1);
  }

  const parts = expr.split(" ").filter((part) => part !== "");

  if (parts.length === 0) {
    return { result: 0, error: "Пустое выражение" };
  }

  const numbers: number[] = [];

  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];

    if (part === "+" || part === "-" || part === "*" || part === "/") {
      if (numbers.length < 2) {
        return { result: 0, error: "Не хватает чисел для операции" };
      }

      const a = numbers.pop()!;
      const b = numbers.pop()!;

      if (part === "+") numbers.push(a + b);
      else if (part === "-") numbers.push(a - b);
      else if (part === "*") numbers.push(a * b);
      else if (part === "/") {
        if (b === 0) {
          return { result: 0, error: "Нельзя делить на ноль" };
        }
        numbers.push(a / b);
      }
    } else {
      const num = Number(part);
      if (isNaN(num)) {
        return { result: 0, error: `Непонятный символ: ${part}` };
      }
      numbers.push(num);
    }
  }

  if (numbers.length !== 1) {
    return { result: 0, error: "Неправильное выражение" };
  }

  return { result: numbers[0] };
}

// Функция только для вывода
function calc(expression: string): void {
  const calculation = calculate(expression);

  if (calculation.error) {
    console.log(`Ошибка: ${calculation.error}`);
  } else {
    console.log(calculation.result);
  }
}

console.log("Проверка работы:");
calc("+ (* 2 3) 4");

console.log("\nПроверка ошибок:");
calc("+ 3");
calc("+ a 4");
calc("/ 10 0");
calc("( + 1 2");
calc("1 2 3");
calc("");
calc("()");
