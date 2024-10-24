package com.hiraeth.blog.requests;

import lombok.Data;

@Data
public class BookReviewRequest {
    private String bookName;
    private String review;
    private int rating;
}
