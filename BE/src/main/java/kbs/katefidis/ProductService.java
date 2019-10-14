package kbs.katefidis;

import kbs.katefidis.models.Product;
import kbs.katefidis.repositories.ProductRepository;
import org.springframework.stereotype.Service;

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

    @Transactional
    public Product create() {
        Product product = new Product();
        product.setTitle("Apple iPhone 11 Pro 256GB");
        product.setImage("https://i.imgur.com/fKEuHYq.jpg");
        product.setPrice(1429);
        product.setQuantity(10);
        return productRepository.save(product);
    }




}
