package kbs.katefidis.services;

import kbs.katefidis.entities.Product;
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
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(Long productID) {
        productRepository.deleteById(productID);
    }

    @Transactional
    public Product editProduct(Product product) {
        Product newProduct = productRepository.getOne(product.getId());
        newProduct.setImage(product.getImage());
        newProduct.setPrice(product.getPrice());
        newProduct.setQuantity(product.getQuantity());
        newProduct.setTitle(product.getTitle());
        return productRepository.save(newProduct);
    }

}
