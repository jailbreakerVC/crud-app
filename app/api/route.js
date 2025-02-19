// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";
// import _ from "lodash";

// const filePath = path.join(process.cwd(), "data", "users.json");

// const readData = () => {
//   const data = fs.readFileSync(filePath, "utf8");
//   return JSON.parse(data);
// };

// const writeData = (data) => {
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
// };

// // Function to introduce a random delay (between 1 and 2 seconds)
// const randomDelay = () => {
//   const delay = Math.random() * 1000 + 1000; // Random between 1000ms (1s) and 2000ms (2s)
//   return new Promise((resolve) => setTimeout(resolve, delay));
// };

// // Add a new user
// export async function POST(request) {
//   await randomDelay();
//   try {
//     const users = readData();
//     const newUser = await request.json();

//     newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
//     users.push(newUser);
//     writeData(users);

//     return NextResponse.json({ message: "User added", user: newUser }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
//   }
// }

// // Update a user
// export async function PUT(request) {
//   console.log("Received call for update user");
//   await randomDelay();
//   try {
//     const users = readData();
//     const updatedUser = await request.json();
//     console.log("Updated User: ", updatedUser);

//     const index = users.findIndex((user) => user.id === updatedUser.id);
//     if (index === -1) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     console.log("Before update:", users[index]);
//     users[index] = _.merge({}, users[index], updatedUser);
//     console.log("After update:", users[index]);

//     writeData(users);
//     console.log("Returning response");
//     return NextResponse.json({ message: "User updated", user: users[index] }, { status: 200 });
//   } catch (error) {
//     console.log("ERROR", error);
//     return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
//   }
// }

// // Delete a user
// export async function DELETE(request) {
//   console.log("Received request for DELETE");
//   await randomDelay();
//   try {
//     const users = readData();
//     const { id } = await request.json(); // Expect { "id": X }
//     console.log("ID", id);

//     const filteredUsers = users.filter((user) => user.id !== id);
//     if (filteredUsers.length === users.length) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     writeData(filteredUsers);
//     return NextResponse.json({ message: "User deleted" }, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
//   }
// }

// // Get all users
// export async function GET() {
//   await randomDelay();
//   try {
//     const users = readData();
//     return NextResponse.json(users, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
//   }
// }
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
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
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
