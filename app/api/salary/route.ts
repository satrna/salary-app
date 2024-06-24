// app/api/main/route.ts

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const addOnPayRecords = await prisma.addOnPay.findMany({
      include: {
        Employee: {
          select: {
            name: true,
            position: true,
          },
        },
      },
    });
    return NextResponse.json(addOnPayRecords);
  } catch (error) {
    console.error("Error fetching add-on pay records:", error);
    return NextResponse.json(
      { error: "Failed to fetch add-on pay records" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, bonus, deduction, date } = data;

    // Ensure the necessary fields are present
    if (!name || bonus == null || deduction == null || !date) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const rel_user = await prisma.employee.findFirst({
      where: {
        name: name,
      },
    });

    if (!rel_user) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    const employee_id = rel_user.id;

    // Create a new add-on pay record in the database
    const newAddOnPayRecord = await prisma.addOnPay.create({
      data: {
        bonus: bonus,
        deduction: deduction,
        date: new Date(date),
        employeeId: employee_id,
      },
    });

    return NextResponse.json(newAddOnPayRecord, { status: 201 });
  } catch (error) {
    console.error("Error creating add-on pay record:", error);
    return NextResponse.json(
      { error: "Failed to create add-on pay record" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
