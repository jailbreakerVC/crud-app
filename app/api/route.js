export const dynamic = "force-dynamic";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    revalidatePath("/api");
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST - Create a new user
export async function POST(request) {
  try {
    const { name, email, username } = await request.json();
    const newUser = await prisma.user.create({
      data: { name, email, username },
    });
    revalidatePath("/api");
    return NextResponse.json(
      { message: "User added", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
  }
}

// PUT - Update user
export async function PUT(request) {
  try {
    const { id, name, email, username } = await request.json();
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, username },
    });

    return NextResponse.json(
      { message: "User updated", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a user
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.user.delete({
      where: { id },
    });
    revalidatePath("/api");
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
