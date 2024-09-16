import {
  DateTimeFormatter,
  LocalDate,
  LocalDateTime,
  ZonedDateTime,
  ZoneId,
} from '@js-joda/core';
import { Locale } from '@js-joda/locale';
import "@js-joda/timezone";

export class NaverBooking {
  private readonly _title: string;
  private readonly _info: string;
  private readonly _naverDate: string;
  private readonly _bookingAt: ZonedDateTime;
  private readonly _now: LocalDateTime;

  constructor(
    title: string,
    date: string,
    info: string,
    now = LocalDate.now(),
  ) {
    this._title = title;
    this._info = info;
    this._naverDate = date;
    this._bookingAt = this._toBookingAt(date, now);
  }

  private _toBookingAt(dateString: string, now: LocalDate) {
    const formatDate = this.getFormatDate(dateString, now);
    const pattern = 'yyyy. M. d h:mm a';
    const formatter = DateTimeFormatter.ofPattern(pattern).withLocale(
      Locale.KOREAN,
    );

    const localDateTime = LocalDateTime.parse(formatDate, formatter);

    return ZonedDateTime.of(localDateTime, ZoneId.of('Asia/Seoul'));
  }

  private getFormatDate(dateString: string, now: LocalDate) {
    const currentYear = now.year();
    return `${currentYear}. ${dateString}`
      .replace('오전', 'AM')
      .replace('오후', 'PM')
      .replace(/(PM|AM)\s+(\d+:\d+)/, '$2 $1')
      .replace(/(월|화|수|목|금|토|일)/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  get formattedBookingAt(): string {
    return this._bookingAt.format(
      DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss'),
    );
  }

  get bookingAt(): ZonedDateTime {
    return this._bookingAt;
  }

  get info(): string {
    return this._info;
  }

  get naverDate(): string {
    return this._naverDate;
  }

  get title(): string {
    return this._title;
  }
}
