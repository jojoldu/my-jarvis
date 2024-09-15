import {getNaverBookings} from "./naver/booking/getNaverBookings";

const cookie = process.argv.slice(2)[0] as string;

getNaverBookings(cookie).then(bookings => {
    console.log(bookings);
});
