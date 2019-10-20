package kbs.katefidis.services;

import kbs.katefidis.entities.User;
import kbs.katefidis.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User getUser(String userEmail) {
        return userRepository.getUserByEmail(userEmail);
    }

    public ResponseEntity<String> createUser(User user) {
        try {
            userRepository.save(user);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("User has been created!(" + HttpStatus.CREATED + ")");
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "This user cannot be created!", e);
        }
    }

    public ResponseEntity<String> deleteUser(Long userID) {
        try {
            userRepository.deleteById(userID);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("User has been deleted!(" + HttpStatus.OK + ")");
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "This user cannot be removed!", e);
        }
    }

    @Transactional
    public ResponseEntity<String> editUser(User user) {
        try {
            User newUser = userRepository.getOne(user.getId());
            newUser.setName(user.getName());
            newUser.setSurname(user.getSurname());
            newUser.setEmail(user.getEmail());
            userRepository.save(newUser);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("User has been edited!(" + HttpStatus.OK + ")");
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "This user cannot be edited!", e);
        }
    }

}
