package kbs.katefidis;

import kbs.katefidis.models.Product;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT })
@RestController
@RequestMapping("/api")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping(path = "/createProduct", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Long createProductRequest(@RequestBody Product product){
        return productService.createProduct(product).getId();
    }

    @GetMapping(path = "/getProducts", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Product> getProductsRequest(){
        return productService.findAll();
    }


}
