package com.vdc.hrservice.common;

import com.vdc.hrservice.office.domain.Comment;

public class SecureUlti {
    
    public static boolean hasEditComment(Comment comment, String username) {
        try {
            String userComment = comment.getUser().getUsername();
            if(comment==null || username==null){
                return false;
            }
            return userComment == username;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
