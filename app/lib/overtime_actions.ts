"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";


const prisma = new PrismaClient();


export async function createOvertime(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  // const schema = z.object({
  //   name: z.string().min(1),
  //   hours: z.number(),
  //   date: z.string().date(),
  // });
  const data = {
    name: formData.get("name") as string,
    hours: parseFloat(formData.get("hours") as string),
    date: formData.get("date") as string,
  };

  if (!data.name || !data.hours || !data.date) {
    console.error("Something went null");
    console.error(data);
    return { message: "Failed to create overtime" };
  }


  try {
    const rel_user = await prisma.employee.findFirst({
      where: {
        name: data.name,
      },
    });
    
    if (!rel_user) {
      console.error("Could not find employee")
      return { message: "Failed to create overtime" };
    }

    const current_overtime_rate = rel_user.overtime_rate;
    const employee_id = rel_user.id;

    // Calculate the total overtime paycheck
    const total_overtime_paycheck = Math.floor(
      current_overtime_rate * data.hours
    );

    // Create a new overtime record in the database
    const newOvertimeRecord = await prisma.overtime.create({
      data: {
        hours: data.hours,
        current_overtime_rate: current_overtime_rate,
        total_overtime_paycheck: total_overtime_paycheck,
        date: new Date(data.date),
        employeeId: employee_id,
      },
    });
    revalidatePath("/dashboard/overtime");
    return { message: "Added overtime" };
  } catch (error) {
    console.error("Error creating salary:", error);
    return { message: "Failed to create overtime" };
  }
}