// app/api/main/route.ts

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const employee = await prisma.employee.findMany();
    return NextResponse.json(employee);
  } catch (error) {
    console.error("Error fetching mocks:", error);
    return NextResponse.json(
      { error: "Failed to fetch mocks" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, position, base_salary, allowance, time_in, time_out } = data;

    // Ensure the necessary fields are present
    if (!name || !position || !base_salary || !time_in || !time_out) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const timeIn = new Date(time_in);
    const timeOut = new Date(time_out);



    // Example calculation for base_salary (customize as needed)
    const daily_rate_cal = Math.floor(base_salary / 21);
    const overtime_rate_cal = Math.floor(base_salary / 173);

    // Create a new employee record in the database
    const newEmployee = await prisma.employee.create({
      data: {
        name,
        position,
        base_salary,
        allowance: allowance || 0,
        daily_rate: daily_rate_cal,
        overtime_rate: overtime_rate_cal,
        time_in: timeIn,
        time_out: timeOut,
      },
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}