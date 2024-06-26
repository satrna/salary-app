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
  // const schema = z.object({
  //   name: z.string().min(1),
  //   bonus: z.number(),
  //   deduction: z.number(),
  //   date: z.string().date(),
  // });
  const data = {
    name: formData.get("name") as string,
    bonus: parseInt(formData.get("bonus") as string),
    deduction: parseInt(formData.get("deduction") as string),
    date: formData.get("date") as string,
  };


  if (!data.name || !data.bonus || !data.deduction || !data.date) {
    console.error("Something went null");
    console.error(data);
    return { message: "Failed to create salary" };
  }


  try {
    const rel_user = await prisma.employee.findFirst({
      where: {
        name: data.name,
      },
    });
   
    if (!rel_user) {
      console.error("Could not find employee")
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
  } catch (error) {
    console.error("Error creating salary:", error);
    return { message: "Failed to create todo" };
  }
}

export async function deleteSalary(id: number) {
  // throw new Error('Failed to Delete Invoice');
  console.log(id);
  try {
    const deleteSalary = await prisma.addOnPay.delete({
      where: {
        id: id,
      }
    })
    
    revalidatePath("/dashboard/salary");
    return { message: 'Deleted salary' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete salary.' };
  }
}