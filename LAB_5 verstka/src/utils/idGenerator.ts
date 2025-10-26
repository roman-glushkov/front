// Универсальный генератор ID для слайдов и элементов
let counter = 0;

export function generateId(prefix: string = 'id'): string {
  const randomPart = Math.random().toString(36).substring(2, 8); // 6 символов
  const timePart = Date.now().toString(36); // текущая метка времени
  counter = (counter + 1) % 10000; // чтобы не перезаполнялось

  return `${prefix}_${timePart}_${randomPart}_${counter}`;
}
