package com.vdc.hrservice.hr.utils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import org.apache.poi.ss.usermodel.DateUtil;
import org.springframework.util.StringUtils;

import com.vdc.hrservice.config.Constants;

public class DateUtils {

    private static final String GMT_07 = "Asia/Bangkok";

    public static final String SHORT_PATTERN = "dd/MM/yyyy";

    public static final String SHORT_PATTERN_DDMMYYYY1 = "dd/MM/yyyy";
    public static final String SHORT_PATTERN_DDMMYYYY2 = "dd-MM-yyyy";
    public static final String SHORT_PATTERN_DDMMYYYY3 = "dd_MM_yyyy";
    public static final String SHORT_PATTERN_DDMMYYYY4 = "dd.MM.yyyy";
    public static final String SHORT_PATTERN_DDMMYYYY5 = "ddMMyyyy";
    public static final String SHORT_PATTERN_YYYYMMDD1 = "yyyy/MM/dd";
    public static final String SHORT_PATTERN_YYYYMMDD2 = "yyyy-MM-dd";
    public static final String SHORT_PATTERN_YYYYMMDD3 = "yyyy_MM_dd";
    public static final String SHORT_PATTERN_YYYYMMDD4 = "yyyy.MM.dd";
    public static final String SHORT_PATTERN_YYYYMMDD5 = "yyyyMMdd";

    public static final String SHORT_PATTERN_EN = "m/d/yy";

    public static ZonedDateTime convert2Zone(String pattern) {
        if (StringUtils.isEmpty(pattern))
            return null;
        try {
            ZonedDateTime client = ZonedDateTime.parse(pattern);
            return client.withZoneSameInstant(ZoneId.of(GMT_07));
        } catch (Exception e) {
            return null;
        }
    }

    public static ZonedDateTime convertShort2Zone(String value) {
        if (StringUtils.isEmpty(value))
            return null;

        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(SHORT_PATTERN_YYYYMMDD2);
            Date date = simpleDateFormat.parse(value);

            return date.toInstant().atZone(ZoneId.of(GMT_07));
        } catch (Exception e) {
            return null;
        }
    }

    public static ZonedDateTime now() {
        return ZonedDateTime.now(ZoneId.of(GMT_07));
    }

    public static Timestamp getTimestamp() {
        return new Timestamp(System.currentTimeMillis());
    }

    public static void main(String[] args) throws ParseException {
        String date = "01/01/2020";
        ZonedDateTime zone = convertShort2Zone(date);
        System.out.println(format(zone, "dd"));

    }

    public static String format(ZonedDateTime datetime, String pattern) {

        return datetime == null ? "" : datetime.format(DateTimeFormatter.ofPattern(pattern));
    }

    public static ZonedDateTime getJavaDate(Double datetimeSerria) {
        try {
            Date date = DateUtil.getJavaDate(datetimeSerria, false, TimeZone.getTimeZone(ZoneId.of(GMT_07)));

            return date.toInstant().atZone(ZoneId.of(GMT_07));
        } catch (Exception e) {
            // e.printStackTrace();
            return null;
        }
    }

    public static ZonedDateTime getJavaDate(Double datetimeSerria, long monthPus) {
        try {
            Date date = DateUtil.getJavaDate(datetimeSerria, false, TimeZone.getTimeZone(ZoneId.of(GMT_07)));

            return date.toInstant().atZone(ZoneId.of(GMT_07)).plusMonths(monthPus);
        } catch (Exception e) {
            // e.printStackTrace();
            return null;
        }
    }

    public static Double getExcelDate(ZonedDateTime timed) {
        try {
            return DateUtil.getExcelDate(Date.from(timed.toInstant()), false);
        } catch (Exception e) {
            // e.printStackTrace();
            return null;
        }
    }

    public static String getExcelDate(Double datetimeSerria) {
        try {
            return DateUtils.format(DateUtils.getJavaDate(datetimeSerria), SHORT_PATTERN);
        } catch (Exception e) {
            // e.printStackTrace();
            return null;
        }
    }

    public static ZonedDateTime convertString2Zone(String value, boolean allowNull) {
        // TODO check trường hợp trường bắt buộc
        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(SHORT_PATTERN);
            Date date = simpleDateFormat.parse(value);

            return date.toInstant().atZone(ZoneId.of(GMT_07));
        } catch (Exception e) {
            return null;
        }
    }

    public static ZonedDateTime convert2Zone(String pattern, boolean allowNull) {
        try {
            ZonedDateTime client = ZonedDateTime.parse(pattern);
            return client.withZoneSameInstant(ZoneId.of(GMT_07));
        } catch (Exception e) {
            return null;
        }
    }

    public static String getStrCurrentMonthYear() {
        String strMonth = Constants.EMPLTY_STRING;

        Calendar c = Calendar.getInstance();
        String strYear = String.valueOf(c.get(Calendar.YEAR));
        int month = c.get(Calendar.MONTH) + 1;

        if (month < 10) {
            strMonth = '0' + String.valueOf(month);
        } else {
            strMonth = String.valueOf(month);
        }

        return strMonth + '/' + strYear;
    }
    
    //tiennm add get curent year
    public static String getStrCurrentYear() {
    	Calendar c = Calendar.getInstance();
    	String strYear = String.valueOf(c.get(Calendar.YEAR));
    	return strYear;
    }

    public static Date convertStringToDateMultipleFormat(String strDate) {
        List<String> formatStrings = Arrays.asList(SHORT_PATTERN_DDMMYYYY1, SHORT_PATTERN_DDMMYYYY2, SHORT_PATTERN_DDMMYYYY3, SHORT_PATTERN_DDMMYYYY4,
                SHORT_PATTERN_DDMMYYYY5, SHORT_PATTERN_YYYYMMDD1, SHORT_PATTERN_YYYYMMDD2, SHORT_PATTERN_YYYYMMDD3, SHORT_PATTERN_YYYYMMDD4,
                SHORT_PATTERN_YYYYMMDD5);

        if (StringUtils.isEmpty(strDate))
            return new Date();

        for (String formatString : formatStrings) {
            try {
                return new SimpleDateFormat(formatString).parse(strDate);
            } catch (ParseException e) {
                // Do nothing
            }
        }
        return null;
    }

    public static ZonedDateTime convertStringToZonedDateMultipleFormat(String strDate) {
        try {
            Date date = convertStringToDateMultipleFormat(strDate);
            ZonedDateTime zoneDate = ZonedDateTime.ofInstant(date.toInstant(),
                    ZoneId.systemDefault());
            return zoneDate;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    public static String getStrLastMonthYear() {
        String strMonth = Constants.EMPLTY_STRING;

        Calendar c = Calendar.getInstance();
        c.add(Calendar.MONTH, -1);
        String strYear = String.valueOf(c.get(Calendar.YEAR));
        int month = c.get(Calendar.MONTH) + 1;

        if (month < 10) {
            strMonth = '0' + String.valueOf(month);
        } else {
            strMonth = String.valueOf(month);
        }

        return strMonth + '/' + strYear;
    }

}
