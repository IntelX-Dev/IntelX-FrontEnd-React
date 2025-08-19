
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function isValidRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function validateForm<T extends Record<string, any>>(
  data: T,
  rules: Partial<Record<keyof T, (value: any) => string | null>>
): Record<keyof T, string | null> {
  const errors = {} as Record<keyof T, string | null>;

  Object.keys(rules).forEach((key) => {
    const rule = rules[key as keyof T];
    if (rule) {
      errors[key as keyof T] = rule(data[key as keyof T]);
    }
  });

  return errors;
}
