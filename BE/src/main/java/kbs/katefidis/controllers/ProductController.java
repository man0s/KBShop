package kbs.katefidis.controllers;

import kbs.katefidis.entities.Product;
import kbs.katefidis.services.ProductService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping(path = "/getProducts", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Product> getProductsRequest(){
        return productService.findAll();
    }

    @PostMapping(path = "/createProduct", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Product createProductRequest(@RequestBody Product product){
        return productService.createProduct(product);
    }

    @DeleteMapping(path = "/deleteProduct/{id}")
    public void deleteProductRequest(@PathVariable("id") Long productID){
        productService.deleteProduct(productID);
    }

    @PutMapping(path = "/editProduct", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Product editProductRequest(@RequestBody Product product){
       return productService.editProduct(product);
    }

}
