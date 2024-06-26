"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

function createUTCDate(hours: number, minutes: number) {
  const date = new Date();
  date.setUTCHours(hours, minutes, 0, 0);
  return date;
}

export async function createAttendance(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  // const schema = z.object({
  //   name: z.string().min(1),
  //   timein: z.string().time(),
  //   timeout: z.string().time(),
  //   date: z.string().date(),
  // });
  const data = {
    name: formData.get("name") as string,
    timein: formData.get("timein") as string,
    timeout: formData.get("timeout") as string,
    date: formData.get("date") as string,
  };

  if (!data.name || !data.timein || !data.timeout || !data.date) {
    console.error("Something went null");
    console.error(data);
    return { message: "Failed to create attendance" };
  }

  try {
    const [hours1, minutes1, second1] = data.timein.split(":").map(Number);
    const [hours2, minutes2, second2] = data.timeout.split(":").map(Number);
    const clock = {
      time_in: createUTCDate(hours1, minutes1),
      time_out: createUTCDate(hours2, minutes2),
    };

    const rel_user = await prisma.employee.findFirst({
      where: {
        name: data.name,
      },
    });

    if (!rel_user) {
      console.error("Could not find employee");
      return { message: "Failed to create attendace" };
    }

    const salary = rel_user.daily_rate;
    const employee_id = rel_user.id;

    // Calculate base_salary and total_salary

    if (clock.time_in.getUTCHours() < rel_user.time_in.getUTCHours()) {
      clock.time_in = rel_user.time_in;
    }

    if (
      clock.time_out.getUTCHours() == rel_user.time_out.getUTCHours() &&
      clock.time_out.getUTCMinutes() > rel_user.time_out.getUTCMinutes()
    ) {
      clock.time_out = rel_user.time_out;
    }

    if (clock.time_out.getUTCHours() > rel_user.time_out.getUTCHours()) {
      clock.time_out = rel_user.time_out;
    }
    // Calculate the total hours worked in milliseconds
    const hours =
      (clock.time_out.getUTCHours() - clock.time_in.getUTCHours()) * 60;
    const minutes =
      clock.time_out.getUTCMinutes() - clock.time_in.getUTCMinutes();
    const total_hours = hours + minutes - 60;
    const actual_hours = (rel_user.time_out.getUTCHours() - rel_user.time_in.getUTCHours() - 1) * 60;
    // Calculate total_salary
    const total_salary = Math.floor((salary / actual_hours) * total_hours);

    // Create a new attendance record in the database
    const newAttendance = await prisma.attendance.create({
      data: {
        time_in: clock.time_in,
        time_out: clock.time_out,
        current_daily_rate: total_salary,
        date: new Date(data.date),
        employeeId: employee_id,
      },
    });
    revalidatePath("/dashboard/attendance");
    return { message: `Added attendance` };
  } catch (error) {
    console.error("Error creating salary:", error);
    return { message: "Failed to create attendance" };
  }
}
