package com.yzmoe.personalblog.pojo;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.sql.Timestamp;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("blog_user")
public class User implements Serializable {

    @TableId
    String username;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    Timestamp lastLoginTime;
}
