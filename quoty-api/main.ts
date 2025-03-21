import { getRandomLineFromFile } from "./utils.ts";

// Path to the file containing lines
const filePath = "./snippets.csv";

// Create an HTTP server
async function handleRequest(req: Request): Promise<Response> {
  try {
    // Get a random line from the file
    const randomLine = await getRandomLineFromFile(filePath);

    // Return the random line as the response
    return new Response(randomLine, {
      headers: { "Content-Type": "text/csv" },
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error in handleRequest:", error);

    // Return a 500 error response
    return new Response("Error fetching a random line.", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

// Start the server
const port = 8000;
console.log(`Server running at http://localhost:${port}`);
Deno.serve({ port }, handleRequest);