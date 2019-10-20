package kbs.katefidis.services;

import kbs.katefidis.entities.Product;
import kbs.katefidis.repositories.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public ResponseEntity<String> createProduct(Product product) {
        try {
            productRepository.save(product);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Product has been created!(" + HttpStatus.CREATED + ")");
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "This product cannot be created!", e);
        }
    }

    public ResponseEntity<String> deleteProduct(Long productID) {
        try {
            productRepository.deleteById(productID);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Product has been deleted!(" + HttpStatus.OK + ")");
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "This product cannot be deleted!", e);
        }
    }

    @Transactional
    public ResponseEntity<String> editProduct(Product product) {
        try {
            Product newProduct = productRepository.getOne(product.getId());
            newProduct.setImage(product.getImage());
            newProduct.setPrice(product.getPrice());
            newProduct.setQuantity(product.getQuantity());
            newProduct.setTitle(product.getTitle());
            productRepository.save(newProduct);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Product has been edited!(" + HttpStatus.OK + ")");
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "This product cannot be edited!", e);
        }
    }
}
