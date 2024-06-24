"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

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