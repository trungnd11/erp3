package com.vdc.authservice.utils;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class AccountUtils {
    public static String usernameGenerator(String fullName) {
        // Replace Normalized
        String nfdNormalizedString = Normalizer.normalize(fullName, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String normalized = pattern.matcher(nfdNormalizedString).replaceAll("").replaceAll("đ", "d").replaceAll("Đ",
                "D");

        String words[] = normalized.trim().replaceAll("[^a-zA-Z ]+", "").trim()
                .replaceAll("\\s+", " ")
                .split(" ");
        StringBuilder username = new StringBuilder(words[words.length - 1]);

        for (int i = 0; i < words.length; i++) {
            if (i < words.length - 1) {
                username.append(words[i].substring(0, 1));
            }
        }

        return username.toString().toLowerCase();
    }
    public static void main(String[] args) {
        String username = usernameGenerator("Pham Minh Tu Ti");
        System.out.println(username);
    }
}
