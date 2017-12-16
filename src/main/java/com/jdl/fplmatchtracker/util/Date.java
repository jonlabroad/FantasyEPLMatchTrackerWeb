package com.jdl.fplmatchtracker.util;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

public class Date {
    public static final DateTimeFormatter _formatter = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss z");

    public static String toString(DateTime time) {
        return _formatter.print(time);
    }

    public static DateTime fromString(String dateString) {
        return _formatter.parseDateTime(dateString);
    }
}
