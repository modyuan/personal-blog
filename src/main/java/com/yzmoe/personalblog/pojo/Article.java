package com.yzmoe.personalblog.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.Date;


@Data
@Component
@TableName("blog_article")
public class Article {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String title;
    private String author;
    private String tags;
    private String brief;
    private String content;

    //RFC3339 date-time
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "+00:00")
    private Timestamp createTime;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "+00:00")
    private Timestamp modifiedTime;

    @TableLogic
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Integer deleted;
}
