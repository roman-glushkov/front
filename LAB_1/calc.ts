function calc(expression: string, isRootCall: boolean = true): number {
  //
  //
  //
  //разбить на функции, вывод и вычесление отдельно
  //
  //
  //
  //
  if (!expression.trim()) {
    if (isRootCall) console.log("Ошибка: Пустое выражение");
    return 0;
  }

  let expr = expression.replace(/\s+/g, " ").trim();

  while (expr.includes("(")) {
    const open = expr.lastIndexOf("(");
    const close = expr.indexOf(")", open);

    if (close === -1) {
      if (isRootCall) console.log("Ошибка: Не хватает закрывающей скобки");
      return 0;
    }

    const inside = expr.slice(open + 1, close);

    if (!inside.trim()) {
      if (isRootCall) console.log("Ошибка: Пустые скобки");
      return 0;
    }

    const result = calc(inside, false);
    expr = expr.slice(0, open) + result + expr.slice(close + 1);
  }

  const parts = expr.split(" ").filter((part) => part !== "");

  if (parts.length === 0) {
    if (isRootCall) console.log("Ошибка: Пустое выражение");
    return 0;
  }

  const numbers: number[] = [];

  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];

    if (part === "+" || part === "-" || part === "*" || part === "/") {
      if (numbers.length < 2) {
        if (isRootCall) console.log("Ошибка: Не хватает чисел для операции");
        return 0;
      }

      const a = numbers.pop()!;
      const b = numbers.pop()!;

      if (part === "+") numbers.push(a + b);
      else if (part === "-") numbers.push(a - b);
      else if (part === "*") numbers.push(a * b);
      else if (part === "/") {
        if (b === 0) {
          if (isRootCall) console.log("Ошибка: Нельзя делить на ноль");
          return 0;
        }
        numbers.push(a / b);
      }
    } else {
      const num = Number(part);
      if (isNaN(num)) {
        if (isRootCall) console.log(`Ошибка: Непонятный символ: ${part}`);
        return 0;
      }
      numbers.push(num);
    }
  }

  if (numbers.length !== 1) {
    if (isRootCall) console.log("Ошибка: Неправильное выражение");
    return 0;
  }

  const result = numbers[0];
  if (isRootCall) console.log(result);
  return result;
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
