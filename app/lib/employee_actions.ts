"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

function createUTCDate(hours: number, minutes: number) {
  const date = new Date();
  date.setUTCHours(hours, minutes, 0, 0);
  return date;
}

export async function createEmployee(
    prevState: {
      message: string;
    },
    formData: FormData
  ) {
    const schema = z.object({
      name: z.string().min(1),
      position: z.string().min(1),
      basesalary: z.number(),
      allowance: z.number(),
      timein: z.string().time(),
      timeout: z.string().time(),
    });
  
    const parse = schema.safeParse({
      name: formData.get("name"),
      position: formData.get("position"),
      basesalary: formData.get("basesalary"),
      timein: formData.get("timein"),
      timeout: formData.get("timeout"),
    });
  
    if (!parse.success) {
      return { message: "Failed to create employee" };
    }
  
    const data = parse.data;
  
    try {
      const timeIn = new Date(data.timein);
      const timeOut = new Date(data.timeout);
  
      // Example calculation for base_salary (customize as needed)
      const daily_rate_cal = Math.floor(data.basesalary / 21);
      const overtime_rate_cal = Math.floor(data.basesalary / 173);
  
      // Create a new employee record in the database
      const newEmployee = await prisma.employee.create({
        data: {
          name: data.name,
          position: data.position,
          base_salary: data.basesalary,
          allowance: data.allowance,
          daily_rate: daily_rate_cal,
          overtime_rate: overtime_rate_cal,
          time_in: timeIn,
          time_out: timeOut,
        },
      });
  
      revalidatePath("/dashboard/employee");
      return { message: "Added todo employee" };
    } catch (e) {
      return { message: "Failed to create employee" };
      
    }
  }