import { z } from "zod";

export const appointmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Patient name must be at least 3 characters")
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\u0600-\u06FF\s]+$/,
      "Patient name can contain letters (Arabic/English) and spaces only",
    ),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^09\d{8}$/,
      "Phone must start with 09 and contain exactly 10 digits",
    ),

  blood: z.enum([""], {
    errorMap: () => ({ message: "Please select a valid blood type" }),
  }),

  preBooked: z.enum([""], {
    errorMap: () => ({ message: "Please select an appointment type" }),
  }),

  date: z
    .string()
    .min(1, "Date is required")
    .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be in DD-MM-YYYY format")
    .refine((date) => {
      const [day, month, year] = date.split("-").map(Number);

      if (day < 1 || day > 31) return false;
      if (month < 1 || month > 12) return false;
      if (year < 2000 || year > 2027) return false;

      //  التحقق من التاريخ)
      const parsedDate = new Date(year, month - 1, day);
      return (
        parsedDate.getFullYear() === year &&
        parsedDate.getMonth() === month - 1 &&
        parsedDate.getDate() === day
      );
    }, "Please enter a valid date (Days <= 31, Months <= 12, Year <= 2027)"),
});
