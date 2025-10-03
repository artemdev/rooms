import { http, HttpResponse, delay } from 'msw';
import { rooms } from './data/rooms';

export const handlers = [
  http.get('/rooms', async ({ request }) => {
    const page = Number(new URL(request.url).searchParams.get('page') || 0);

    await delay(Number(process.env.NEXT_PUBLIC_MOCK_DELAY));

    if (rooms[page]) {
      return HttpResponse.json(rooms[page]);
    }

    return HttpResponse.json({ data: [] });
  }),
];
