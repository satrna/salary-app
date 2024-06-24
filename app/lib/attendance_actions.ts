"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

export async function createAttendance(
    prevState: {
      message: string;
    },
    formData: FormData
  ) {
    const schema = z.object({
      name: z.string().min(1),
      timein: z.string().time(),
      timeout: z.string().time(),
      date: z.string().date(),
    });
    const parse = schema.safeParse({
      name: formData.get("name"),
      timein: formData.get("timein"),
      timeout: formData.get("timeout"),
      date: formData.get("date"),
    });
  
    if (!parse.success) {
      return { message: "Failed to create attendance" };
    }
  
    const data = parse.data;
  
    try {
      const rel_user = await prisma.employee.findFirst({
        where: {
          name: data.name,
        },
      });
  
      if (!rel_user) {
        return { message: "Failed to create attendance" };
      }
  
      const salary = rel_user.base_salary;
      const employee_id = rel_user.id;
  
      // Calculate base_salary and total_salary
      const base_salary = Math.floor(salary / 21);
  
      let timeIn = new Date(data.timein);
      let timeOut = new Date(data.timeout);

      if (timeIn.getTime() < rel_user.time_in.getTime()) {
        timeIn = rel_user.time_in;
      }

      if(timeOut.getTime() < rel_user.time_out.getTime()) {
        timeOut = rel_user.time_out;
      }
  
      // Calculate the total hours worked in milliseconds
      const hoursWorked =
        (timeOut.getTime() - timeIn.getTime()) / (1000 * 60 * 60); // Convert milliseconds to hours
  
      // Calculate total_salary
      const total_salary = Math.floor(hoursWorked * base_salary);
  
      // Create a new attendance record in the database
      const newAttendance = await prisma.attendance.create({
        data: {
          time_in: timeIn,
          time_out: timeOut,
          current_daily_rate: total_salary,
          date: new Date(data.date),
          employeeId: employee_id,
        },
      });
  
      revalidatePath("/dashboard/attendance");
      return { message: `Added attendance` };
    } catch (e) {
      return { message: "Failed to create attendance" };
    }
  }