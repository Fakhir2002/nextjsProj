// src/app/api/auth/signup/route.js
import { connectDB } from "@/lib/mongodb"; // Make sure to connect to your MongoDB
import User from "@/models/User"; // Adjust the path according to your project structure
import bcrypt from "bcrypt";

export async function POST(req) {
  const { email, password } = await req.json();

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  try {
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User created successfully!" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating user" }), {
      status: 400,
    });
  }
}
