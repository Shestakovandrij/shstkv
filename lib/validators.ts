import { z } from 'zod';

export const PACKAGE_VALUES = ['p200', 'p400', 'consult'] as const;
export type PackageValue = (typeof PACKAGE_VALUES)[number];

export const leadFormSchema = z.object({
  name: z
    .string({ required_error: "Вкажіть ім'я" })
    .trim()
    .min(2, "Мінімум 2 символи"),
  phone: z
    .string({ required_error: 'Вкажіть телефон' })
    .trim()
    .min(6, 'Невірний формат телефону')
    .regex(/^[+\d\s()\-]+$/u, 'Тільки цифри, пробіли, +, -, ()'),
  packageValue: z.enum(PACKAGE_VALUES, {
    errorMap: () => ({ message: 'Оберіть пакет' }),
  }),
  comment: z.string().trim().max(1000, 'Максимум 1000 символів').optional().or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Потрібна згода з політикою конфіденційності' }),
  }),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
