package kbs.katefidis.controllers;

import kbs.katefidis.entities.User;
import kbs.katefidis.services.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "/getUsers", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<User> getUsersRequest() {
        return userService.findAll();
    }

    @GetMapping(path = "/getUser/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUserRequest(@PathVariable("email") String userEmail) {
        return userService.getUser(userEmail);
    }

    @PostMapping(path = "/createUser", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createUserRequest(@RequestBody User user) {
        return userService.createUser(user);
    }

    @DeleteMapping(path = "/deleteUser/{id}")
    public ResponseEntity<String> deleteUserRequest(@PathVariable("id") Long userID) {
        return userService.deleteUser(userID);
    }

    @PutMapping(path = "/editUser", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> editUserRequest(@RequestBody User user) {
        return userService.editUser(user);
    }
}

