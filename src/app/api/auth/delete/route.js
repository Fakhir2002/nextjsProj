// app/api/auth/delete/route.js
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/mongodb"; // Ensure you have this utility
import User from "@/models/User"; // Adjust the path as needed

export async function DELETE(req) {
  const session = await getServerSession(); // Get the session on the server

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  await dbConnect();

  try {
    await User.deleteOne({ email: session.user.email }); // Identify by email
    return new Response(
      JSON.stringify({ message: "Account deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to delete account" }),
      { status: 500 }
    );
  }
}
