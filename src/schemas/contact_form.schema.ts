import { z } from "zod"

export const ContactFormSchema = z.object({
  name: z.string().min(3, 'Insira um nome válido'),
  email: z.string().email('Insira um email válido').min(3, 'Insira um email válido'),
  message: z.string().min(1, 'Por favor, deixe uma mensagem')
});

export type TContactForm = z.infer<typeof ContactFormSchema>;