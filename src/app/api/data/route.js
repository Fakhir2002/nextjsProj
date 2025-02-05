export async function GET() {
  const data = {
    message: "Hello, this is your custom API!",
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
