"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";


const prisma = new PrismaClient();

export type State = {
  total?: number | null;
  bonus?: number | null;
  overtime?: number | null;
  daily?: number | null;
  deduction?: number | null;
  message?: string | null;
};

export async function createDownloadAll(
  prevState: State,
  formData: FormData
) {
  // const schema = z.object({
  //   name: z.string().min(1),
  //   timein: z.string().time(),
  //   timeout: z.string().time(),
  //   date: z.string().date(),
  // });
  const data = {
    dateIn: formData.get("firstDate") as string,
    dateOut: formData.get("lastDate") as string,
  };
  if (!data.dateIn || !data.dateOut) {
    console.error("Something went null");
    console.error(data);
    return { message: "Failed to create attendance" };
  }

  if (new Date(data.dateIn) > new Date(data.dateOut)) {
    console.error("DateIn more than dateOut");
    console.error(data);
    return { message: "Failed to create attendance" };
  }

  try {
    const attendace_data = await prisma.attendance.findMany({
      where: {
        date: {
          lte: new Date(data.dateOut),
          gte: new Date(data.dateIn),
        },
      },
    });
    const overtime_data = await prisma.overtime.findMany({
      where: {
        date: {
          lte: new Date(data.dateOut),
          gte: new Date(data.dateIn),
        },
      },
    });
    const salary_data = await prisma.addOnPay.findMany({
      where: {
        date: {
          lte: new Date(data.dateOut),
          gte: new Date(data.dateIn),
        },
      },
    });

    const totalDailyRate = attendace_data.reduce((total, attendance) => {
      return total + attendance.current_daily_rate;
    }, 0);
    const totalOvertimeRate = overtime_data.reduce((total, overtime) => {
      return total + overtime.total_overtime_paycheck;
    }, 0);
    const totalBonus = salary_data.reduce((total, salary) => {
      return total + salary.bonus;
    }, 0);
    const totalDeduction = salary_data.reduce((total, salary) => {
      return total + salary.deduction;
    }, 0);
    const totalTotal =
      totalDailyRate + totalOvertimeRate + totalBonus - totalDeduction;

    return {
      message: `Added attendance`,
      total: totalTotal,
      daily: totalDailyRate,
      bonus: totalBonus,
      deduction: totalDeduction,
      overtime: totalOvertimeRate,
    };
  } catch (error) {
    console.error("Error creating salary:", error);
    return { message: "Failed to create attendance" };
  }
}
