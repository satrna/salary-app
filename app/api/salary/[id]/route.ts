import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // Get the id parameter from the query
  const url = req.nextUrl.toString();
  const segments = url.split("/"); // Split the URL by "/"
  const lastSegment = segments[segments.length - 1]; // Get the last segment
  const value = parseInt(lastSegment); // Convert the last segment to an integer

  // If id is undefined or null, return an error response
  if (isNaN(value)) {
    return NextResponse.json({ error: 'ID parameter is missing' }, { status: 400 });
  }

  try {
    const user = await prisma.mock.findUnique({
      where: {
        id: value,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: NextRequest) {
    // Get the id parameter from the URL
    const url = req.nextUrl.toString();
    const segments = url.split("/"); // Split the URL by "/"
    const lastSegment = segments[segments.length - 1]; // Get the last segment
    const value = parseInt(lastSegment); // Convert the last segment to an integer
  
    // If value is NaN (not a number), return an error response
    if (isNaN(value)) {
      return NextResponse.json({ error: 'ID parameter is missing or invalid' }, { status: 400 });
    }
  
    try {
      // Perform the deletion operation here (using Prisma or any other method)
      // For demonstration purposes, let's assume you're using Prisma to delete a user
      const deleteUser = await prisma.mock.delete({
        where: {
          id: value,
        },
      });
  
      // Check if the user was successfully deleted
      if (!deleteUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      // Return a success response if the deletion was successful
      return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
      // Handle errors if deletion fails
      console.error('Error deleting user:', error);
      return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    } finally {
      // Disconnect from the Prisma client
      await prisma.$disconnect();
    }
  }