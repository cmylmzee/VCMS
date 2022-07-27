package com.verseyazilim.cafemanagmentsystem.config;

import com.verseyazilim.cafemanagmentsystem.entity.Country;
import com.verseyazilim.cafemanagmentsystem.entity.Product;
import com.verseyazilim.cafemanagmentsystem.entity.ProductCategory;
import com.verseyazilim.cafemanagmentsystem.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration // Taranmasını sağlıyor spring boot için
public class MyDataRestConfig implements RepositoryRestConfigurer {


    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);

        // DİSABLE HTTP METHODS FOR PRODUCT : PUT POST DELETE
        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
        disableHttpMethods(Product.class, config, theUnsupportedActions);

        // DİSABLE HTTP METHODS FOR PRODUCTCATEGORY : PUT POST DELETE
        disableHttpMethods(ProductCategory.class, config, theUnsupportedActions);

        disableHttpMethods(Country.class, config, theUnsupportedActions);

        disableHttpMethods(State.class, config, theUnsupportedActions);




        // call an internan helper method
        exposeIds(config);
    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions){
        config.getExposureConfiguration().forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }
    private void exposeIds(RepositoryRestConfiguration config) {
        // expose entity ids
        //

        // - get a list of all entity classes from the entity manager
        Set<javax.persistence.metamodel.EntityType<?>> entities = entityManager.getMetamodel().getEntities();


        // - create an array of the entity tpyes
        List<Class> entityClasses = new ArrayList<>();


        // - get the entity types for the entitites
        for (EntityType<?> tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        // - expose the entity ida for the array of the entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }
}
