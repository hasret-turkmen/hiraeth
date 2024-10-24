package com.hiraeth.blog.requests;

import lombok.Data;

@Data
public class SeriesReviewRequest {
    private String seriesName;
    private String review;
    private int rating;
}
