package com.astrteach.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PageResponse<T> {
    private java.util.List<T> items;
    private long total;
    private int page;
    private int pageSize;
    private int totalPages;
}
