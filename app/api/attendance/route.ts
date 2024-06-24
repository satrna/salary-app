// app/api/main/route.ts

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const overtime = await prisma.attendance.findMany({
      include: {
        Employee: {
          select: {
            name: true,
            position: true,
          },
        },
      },
    });
    return NextResponse.json(overtime);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance records" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, time_in, time_out, date } = data;

    // Ensure the necessary fields are present
    if (!name || !date || !time_in || !time_out) {
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

    const salary = rel_user.base_salary;
    const employee_id = rel_user.id;

    // Calculate base_salary and total_salary
    const base_salary = Math.floor(salary / 21);


    const timeIn = new Date(time_in);
    const timeOut = new Date(time_out);

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
        date: new Date(date),
        employeeId: employee_id,
      },
    });

    return NextResponse.json(newAttendance, { status: 201 });
  } catch (error) {
    console.error("Error creating attendance record:", error);
    return NextResponse.json(
      { error: "Failed to create attendance record" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}