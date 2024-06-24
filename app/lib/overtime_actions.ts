"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();


export async function createOvertime(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    name: z.string().min(1),
    hours: z.number(),
    date: z.string().date(),
  });
  const parse = schema.safeParse({
    name: formData.get("name"),
    hours: formData.get("hours"),
    date: formData.get("date"),
  });

  if (!parse.success) {
    return { message: "Failed to create overtime" };
  }

  const my_data = parse.data;

  try {
    const rel_user = await prisma.employee.findFirst({
      where: { name: { contains: my_data.name } },
    });

    if (!rel_user) {
      return { message: "Failed to create overtime" };
    }

    const current_overtime_rate = rel_user.overtime_rate;
    const employee_id = rel_user.id;

    // Calculate the total overtime paycheck
    const total_overtime_paycheck = Math.floor(
      current_overtime_rate * my_data.hours
    );

    // Create a new overtime record in the database
    const newOvertimeRecord = await prisma.overtime.create({
      data: {
        hours: my_data.hours,
        current_overtime_rate: current_overtime_rate,
        total_overtime_paycheck: total_overtime_paycheck,
        date: new Date(my_data.date),
        employeeId: employee_id,
      },
    });
    revalidatePath("/dashboard/overtime");
    return { message: "Added overtime" };
  } catch (e) {
    return { message: "Failed to create overtime" };
  }
}