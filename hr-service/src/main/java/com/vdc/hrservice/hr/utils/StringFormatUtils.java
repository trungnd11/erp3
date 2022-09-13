package com.vdc.hrservice.hr.utils;

public class StringFormatUtils {
    public static String getEmployeeOf(String maxId) {
        try {
            return String.format("E%04d", Integer.parseInt(maxId.replaceAll("E", "").replaceAll("e", "")) + 1);
        } catch (Exception e) {
            return null;
        }

    }

    public static String getContractOf(String maxId) {
        try {
            return String.format("C%05d", Integer.parseInt(maxId.replaceAll("C", "").replaceAll("c", "")) + 1);
        } catch (Exception e) {
            return null;
        }

    }

    public static String getEmployeeRequestOf(String maxId) {
        try {
            return String.format("ER%05d", Integer.parseInt(maxId.replaceAll("ER", "").replaceAll("er", "")) + 1);
        } catch (Exception e) {
            return null;
        }

    }

    public static void main(String[] args) {
        System.out.println(getContractOf("0"));
    }

    public static String getEmployeeOf(String maxId, int count) {
        try {
            return String.format("E%05d", Integer.parseInt(maxId.replaceAll("E", "").replaceAll("e", "")) + count + 1);
        } catch (Exception e) {
            return null;
        }
    }

    public static String getContractOf(String maxId, int count) {
        try {
            return String.format("C%05d", Integer.parseInt(maxId.replaceAll("C", "").replaceAll("c", "")) + count + 1);
        } catch (Exception e) {
            return null;
        }

    }
}
