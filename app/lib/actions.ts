"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createSalary(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    name: z.string().min(1),
    bonus: z.number(),
    deduction: z.number(),
    date: z.string().date(),
  });
  const parse = schema.safeParse({
    name: formData.get("name"),
    bonus: formData.get("name"),
    deduction: formData.get("deduction"),
    date: formData.get("date"),
  });

  if (!parse.success) {
    return { message: "Failed to create salary" };
  }

  const data = parse.data;

  try {
    const rel_user = await prisma.employee.findFirst({
      where: {
        name: data.name,
      },
    });

    if (!rel_user) {
      return { message: "Failed to create salary" };
    }

    const newAddOnPayRecord = await prisma.addOnPay.create({
      data: {
        bonus: data.bonus,
        deduction: data.deduction,
        date: new Date(data.date),
        employeeId: rel_user.id,
      },
    });

    revalidatePath("/dashboard/salary");
    return { message: "Added salary data" };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

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

  const data = parse.data;

  try {
    const rel_user = await prisma.employee.findFirst({
      where: {
        name: data.name,
      },
    });

    if (!rel_user) {
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
  } catch (e) {
    return { message: "Failed to create overtime" };
  }
}

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

    const timeIn = new Date(data.timein);
    const timeOut = new Date(data.timeout);

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
