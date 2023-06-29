package com.example.demo.repository;

import com.example.demo.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {

    Set<Favorite> findAllByUserId(Integer userId);

    Set<Favorite> findAllByUserIdAndPetDayCareId(Integer petDayCareId, Integer userId);


}
