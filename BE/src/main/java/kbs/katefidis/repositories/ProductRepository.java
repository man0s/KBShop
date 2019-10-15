package kbs.katefidis.repositories;

import kbs.katefidis.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT product.quantity FROM Product product WHERE product.id = :productID")
    Integer getProductQuantity(@Param("productID") Long productID);
}
