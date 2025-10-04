import { rooms } from '../../rooms/data/rooms';

export async function GET(request: Request) {
  const page = Number(new URL(request.url).searchParams.get('page') || 0);

  await delay(Number(process.env.NEXT_PUBLIC_MOCK_DELAY));

  if (rooms[page]) {
    return Response.json(rooms[page]);
  }

  return Response.json({ data: [] });
}

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
