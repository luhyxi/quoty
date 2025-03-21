export async function getRandomLineFromFile(filePath: string): Promise<string> {
    try {
        // Read the file
        const content = await Deno.readTextFile(filePath);
        // Split the file content into lines
        const lines = content.split("\n").filter((line) => line.trim() !== "");
        // Get a random line
        const randomLine = lines[Math.floor(Math.random() * lines.length)];
        return randomLine;
    } catch (error) {
        console.error("Error reading file:", error.message);
        throw error;
    }
}