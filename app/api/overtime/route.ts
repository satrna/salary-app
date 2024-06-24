// app/api/main/route.ts

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const overtimeRecords = await prisma.overtime.findMany({
      include: {
        Employee: {
          select: {
            name: true,
            position: true,
          },
        },
      },
    });
    return NextResponse.json(overtimeRecords);
  } catch (error) {
    console.error("Error fetching overtime records:", error);
    return NextResponse.json(
      { error: "Failed to fetch overtime records" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, hours, date } = data;

    // Ensure the necessary fields are present
    if (!name || !hours || !date) {
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

    const current_overtime_rate = rel_user.overtime_rate;
    const employee_id = rel_user.id;

    // Calculate the total overtime paycheck
    const total_overtime_paycheck = Math.floor(current_overtime_rate * hours);

    // Create a new overtime record in the database
    const newOvertimeRecord = await prisma.overtime.create({
      data: {
        hours: hours,
        current_overtime_rate: current_overtime_rate,
        total_overtime_paycheck: total_overtime_paycheck,
        date: new Date(date),
        employeeId: employee_id,
      },
    });

    return NextResponse.json(newOvertimeRecord, { status: 201 });
  } catch (error) {
    console.error("Error creating overtime record:", error);
    return NextResponse.json(
      { error: "Failed to create overtime record" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
