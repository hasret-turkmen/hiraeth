package com.hiraeth.blog.requests;

import lombok.Data;

@Data
public class MovieReviewRequest {
    private String movieName;
    private String review;
    private int rating;
}
