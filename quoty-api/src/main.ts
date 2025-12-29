import { getRandomLineFromFile } from "./utils.ts";
import { SECURITY_HEADERS, filePath, port, max_requests } from "./utils.ts";

if (isNaN(port)) {
  console.error("Invalid PORT environment variable");
  Deno.exit(1);
}

// Rate limiting storage
const requestCounts = new Map<string, number>();

// Validate file existence at startup
try {
  const fileInfo = await Deno.stat(filePath);
  if (!fileInfo.isFile) {
    console.error(`Path ${filePath} is not a file`);
    Deno.exit(1);
  }
} catch (error:any) {
  if (error instanceof Deno.errors.NotFound) {
    console.error(`File ${filePath} not found`);
    Deno.exit(1);
  }
  console.error(`Error accessing file: ${error.message}`);
  Deno.exit(1);
}

async function handleRequest(req: Request): Promise<Response> {
  // Validate HTTP method
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: SECURITY_HEADERS,
    });
  }

  // Validate URL path
  const url = new URL(req.url);
  if (url.pathname !== "/") {
    return new Response("Not Found", {
      status: 404,
      headers: SECURITY_HEADERS,
    });
  }

  // Rate limiting
  const clientIp = req.headers.get("cf-connecting-ip") || "localhost";
  const currentCount = requestCounts.get(clientIp) || 0;

  if (currentCount >= max_requests) {
    return new Response("Too Many Requests", {
      status: 429,
      headers: SECURITY_HEADERS,
    });
  }

  requestCounts.set(clientIp, currentCount + 1);

  try {
    const randomLine = await getRandomLineFromFile(filePath);

    // Basic content sanitization
    const sanitizedContent = randomLine.replace(/<\/?[^>]+(>|$)/g, "");

    return new Response(sanitizedContent, {
      headers: SECURITY_HEADERS,
    });
  } catch (error) {
    // Error handling with environment-aware logging
    if (Deno.env.get("DENO_ENV") !== "production") {
      console.error(`Error in handleRequest: ${error}`);
    }

    return new Response("Internal Server Error", {
      status: 500,
      headers: SECURITY_HEADERS,
    });
  }
}

// Reset rate limits every minute
setInterval(() => {
  requestCounts.clear();
}, 60 * 1000);

console.log(`Server running at http://localhost:${port}`);
Deno.serve({
  port,
  // Add more security-related Deno.serve options
  onListen: ({ hostname, port }) => {
    console.log(`Server started at ${hostname}:${port}`);
  },
  onError: (error) => {
    console.error("Server error:", error);
    return new Response("Internal Server Error", { status: 500 });
  },
}, handleRequest);