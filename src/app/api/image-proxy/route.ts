export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url || !url.startsWith("https://image.tmdb.org/")) {
    return new Response("Invalid URL", { status: 400 });
  }

  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();

  return new Response(arrayBuffer, {
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
