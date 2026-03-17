package augusto.machado.busiapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class BusiApiApplication {

    public static void main(String[] args) {
        TimeZone.setDefault(TimeZone.getTimeZone("America/Argentina/Buenos_Aires"));
        System.setProperty("user.timezone", "America/Argentina/Buenos_Aires");
        SpringApplication.run(BusiApiApplication.class, args);
    }

}
