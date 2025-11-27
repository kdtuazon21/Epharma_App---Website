package com.deliveryplatform.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FallbackController {

    @GetMapping({ "/", "/{x:[\\w\\-]+}", "/{x:^(?!api)[\\w\\-]+}/{y:[\\w\\-]+}", "/{x:^(?!api)[\\w\\-]+}/{y:[\\w\\-]+}/{z:[\\w\\-]+}" })
    public String forward() {
        return "forward:/index.html";
    }
}
