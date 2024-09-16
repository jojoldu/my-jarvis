import * as cheerio from 'cheerio';
import { NaverBooking } from './NaverBooking';

export async function getNaverBookings(cookie: string) {
    try {
        const html = await getNaverBookingHtml(cookie);
        if(!html) {
            return [];
        }

        const $ = cheerio.load(html);

        return $('div.upcoming_item').map((_, element) => {
            const title = $(element).find('strong.title').text().trim();
            const date = $(element).find('span.date').text().trim();
            const info = $(element).find('span.txt').text().trim();

            return new NaverBooking(title, date, info);
        }).get();
    } catch (error) {
        console.error('Error fetching or parsing HTML:', error);
        return [];
    }
}

async function getNaverBookingHtml(cookie: string): Promise<string> {
    console.log(`cookie: ${cookie}`);
    try {
        const response = await fetch("https://booking.naver.com/my/bookings", {
            "headers": {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                'cache-control': 'no-cache',
                'cookie': cookie,
                'pragma': 'no-cache',
                'priority': 'u=0, i',
                'referer': 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EB%84%A4%EC%9D%B4%EB%B2%84+%EC%98%88%EC%95%BD',
                'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
            },
        });

        return response.text();
    } catch (e) {
        console.error('Error fetching HTML:', e);
        return '';
    }

}

