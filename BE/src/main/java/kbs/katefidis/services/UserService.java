package kbs.katefidis.services;

import kbs.katefidis.entities.User;
import kbs.katefidis.repositories.UserRepository;
import org.springframework.stereotype.Service;
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

    @Transactional
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long userID) {
        userRepository.deleteById(userID);
    }

    @Transactional
    public User editUser(User user) {
        User newUser = userRepository.getOne(user.getId());
        newUser.setName(user.getName());
        newUser.setSurname(user.getSurname());
        newUser.setEmail(user.getEmail());
        return userRepository.save(newUser);
    }

}
