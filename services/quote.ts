import { NINJA_API_KEY } from '@/constants/api';

export const GetRandomQuote = async ({ category }: { category: string }) => {
  try {
    const responseBody = await fetch(
      `https://api.api-ninjas.com/v1/quotes?category=${category}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': NINJA_API_KEY,
        },
      }
    );

    const responseData: {
      quote: string;
      category: string;
      author: string;
    }[] = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData;
  } catch (error: any) {
    throw 'Error getting quote';
  }
};
