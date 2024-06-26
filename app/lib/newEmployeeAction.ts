"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";


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
  // const schema = z.object({
  //   name: z.string().min(1),
  //   position: z.string().min(1),
  //   basesalary: z.number(),
  //   allowance: z.number(),
  //   timein: z.string().time(),
  //   timeout: z.string().time(),
  // });
  const data = {
    name: formData.get("name") as string,
    position: formData.get("position") as string,
    baseSalary: parseInt(formData.get("basesalary") as string),
    allowance: parseInt(formData.get("allowance") as string),
    timeIn: formData.get("timeinput") as string,
    timeOut: formData.get("timeoutput") as string,
  };

  if (
    !data.name ||
    !data.position ||
    !data.baseSalary ||
    !data.allowance ||
    !data.timeIn ||
    !data.timeOut
  ) {
    console.error("Something went null");
    console.error(data)
    return { message: "Failed to create employee" };
  }

  try {
    const [hours1, minutes1, second1] = data.timeIn.split(":").map(Number);
    const [hours2, minutes2, second2] = data.timeOut.split(":").map(Number);
    const timeInUTC = createUTCDate(hours1, minutes1);
    const timeOutUTC = createUTCDate(hours2, minutes2);

    // Example calculation for base_salary (customize as needed)
    const daily_rate_cal = Math.floor(data.baseSalary / 21);
    const overtime_rate_cal = Math.floor(data.baseSalary / 173);

    // Create a new employee record in the database
    const newEmployee = await prisma.employee.create({
      data: {
        name: data.name,
        position: data.position,
        base_salary: data.baseSalary,
        allowance: data.allowance,
        daily_rate: daily_rate_cal,
        overtime_rate: overtime_rate_cal,
        time_in: timeInUTC,
        time_out: timeOutUTC,
      },
    });

    revalidatePath("/dashboard/employee");
    return { message: "Added todo employee" };
  } catch (error) {
    console.error("Error creating employee:", error);
    return { message: "Failed to create employee" };
  }
}
