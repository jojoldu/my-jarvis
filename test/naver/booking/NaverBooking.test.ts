import {describe, it, expect} from "vitest";
import {NaverBooking} from "../../../src/naver/booking/NaverBooking";
import {LocalDate} from "@js-joda/core";

describe("NaverBooking", () => {
    it("should parse date correctly", () => {
        // Given
        const title = 'title';
        const date = '12. 31 금 오후 8:00';
        const info = 'info';

        // When
        const naverBooking = new NaverBooking(title, date, info, LocalDate.of(2022, 12, 31));

        // Then
        expect(naverBooking.formattedBookingAt).toBe('2022-12-31 20:00:00');
    });
});
