package com.yzmoe.personalblog.service;

import com.yzmoe.personalblog.pojo.ResultMsg;
import com.yzmoe.personalblog.pojo.User;

public interface LoginService {
    boolean login(User info);
    String getCurrentLoginUser();
    void logout();
    User getUserInfo(String userName);
    boolean addUser(User user);
    boolean changePassword(User user);
}
