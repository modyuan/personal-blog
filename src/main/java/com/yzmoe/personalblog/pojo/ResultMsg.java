package com.yzmoe.personalblog.pojo;


import lombok.Getter;

@Getter
public class ResultMsg {
    final boolean succeed;
    final String message;

    public ResultMsg(boolean succeed, String message) {
        this.succeed = succeed;
        this.message = message;
    }

    public static ResultMsg succeed(){
        return new ResultMsg(true,"成功");
    }

    public static ResultMsg succeed(String msg){
        return new ResultMsg(true,msg);
    }

    public static ResultMsg fail(String reason){
        return new ResultMsg(false,reason);
    }
}
