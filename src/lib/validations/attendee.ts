import * as z from "zod"

export const attendeeFormSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" }),
  avatarUrl: z.string()
    .url({ message: "Please provide a valid image URL" })
    .optional(),
  specialRequest: z.string()
    .max(500, { message: "Special request must be less than 500 characters" })
    .optional(),
})

export type AttendeeFormValues = z.infer<typeof attendeeFormSchema>
