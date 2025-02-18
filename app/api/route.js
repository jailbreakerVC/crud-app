import { NextResponse } from "next/server";
import fs from "fs"
import path from "path";


const filePath = path.join(process.cwd(), "data", "users.json");


const readData = () => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

// Add a new user
export async function POST(request) {
  try {
    const users = readData();
    const newUser = await request.json();
    
    newUser.id = users.length ? users[users.length - 1].id + 1 : 1; 
    users.push(newUser);
    writeData(users);

    return NextResponse.json({ message: "User added", user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
  }


  
}

// Update a user
export async function PUT(request) {
  try {
    const users = readData();
    const updatedUser = await request.json();
    
    const index = users.findIndex((user) => user.id === updatedUser.id);
    if (index === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    users[index] = { ...users[index], ...updatedUser };
    writeData(users);

    return NextResponse.json({ message: "User updated", user: users[index] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}


export async function DELETE(request) {
  try {
    const users = readData();
    const { id } = await request.json(); // Expect { "id": X }

    const filteredUsers = users.filter((user) => user.id !== id);
    if (filteredUsers.length === users.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    writeData(filteredUsers);
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = readData();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}