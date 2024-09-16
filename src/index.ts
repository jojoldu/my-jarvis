import {getNaverBookings} from "./naver/booking/getNaverBookings";
import {getCookie} from "./naver/booking/getCookie";

const cookie = process.argv.slice(2)[0] as string;

getCookie()
    .then(cookie => getNaverBookings(cookie))
    .then(bookings => console.log(bookings));
