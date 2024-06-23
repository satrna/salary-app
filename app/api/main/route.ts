// app/api/main/route.ts

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const mocks = await prisma.mock.findMany();
    return NextResponse.json(mocks);
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
    const { name, salary, date, time_in, time_out } = data;

    // Ensure the necessary fields are present
    if (!name || !salary || !date || !time_in || !time_out) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Calculate base_salary and total_salary
    const base_salary = Math.floor(salary / 21);

    const timeIn = new Date(time_in);
    const timeOut = new Date(time_out);

    // Calculate the total hours worked in milliseconds
    const hoursWorked =
      (timeOut.getTime() - timeIn.getTime()) / (1000 * 60 * 60); // Convert milliseconds to hours

    // Calculate total_salary
    const total_salary = Math.floor(hoursWorked * base_salary);

    // Create a new mock record in the database
    const newMock = await prisma.mock.create({
      data: {
        name,
        base_salary,
        total_salary,
        date: new Date(date),
        time_in: timeIn,
        time_out: timeOut,
      },
    });

    return NextResponse.json(newMock, { status: 201 });
  } catch (error) {
    console.error("Error creating mock:", error);
    return NextResponse.json(
      { error: "Failed to create mock" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
