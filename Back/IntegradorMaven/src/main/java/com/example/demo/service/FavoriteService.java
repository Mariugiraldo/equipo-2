package com.example.demo.service;

import com.example.demo.DTO.FavoriteDTO;
import com.example.demo.entity.Favorite;
import com.example.demo.entity.PetDayCare;
import com.example.demo.entity.User;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.FavoriteRepository;
import com.example.demo.repository.PetDayCareRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class FavoriteService {

    private FavoriteRepository favoriteRepository;
    private UserRepository userRepository;
    private PetDayCareRepository petDayCareRepository;

    @Autowired
    public FavoriteService(FavoriteRepository favoriteRepository, UserRepository userRepository, PetDayCareRepository petDayCareRepository) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.petDayCareRepository = petDayCareRepository;
    }

    public boolean save(FavoriteDTO favoriteDTO) {
        User user = this.userRepository.findById(favoriteDTO.getUserId()).orElseThrow(() -> new ResourceNotFoundException("No existe un usuario registrado con el id: " + favoriteDTO.getUserId()));
        PetDayCare petDayCare = this.petDayCareRepository.findById(favoriteDTO.getPetDayCareId()).orElseThrow(() -> new ResourceNotFoundException("No existe un hospedaje registrado con el id: " + favoriteDTO.getPetDayCareId()));
        var fav = findFavorite(user.getId(), petDayCare.getId());
        if (fav.isEmpty()) {
            return favoriteRepository.save(new Favorite(user, petDayCare)) != null;
        }
        return false;
    }

    public boolean delete(FavoriteDTO favoriteDTO) {
        var fav = findFavorite(favoriteDTO.getUserId(), favoriteDTO.getPetDayCareId());
        if (fav.isPresent()) {
            favoriteRepository.delete(fav.get());
            return true;
        }
        return false;
    }

    public Set<Favorite> findAllByUser(Integer userId) {
        return favoriteRepository.findAllByUserId(userId);
    }

    public Optional<Favorite> findById(Integer favId){
        return favoriteRepository.findById(favId);
    }

    private Optional<Favorite> findFavorite(Integer userId, Integer pdcId) {
       return favoriteRepository.findAllByUserIdAndPetDayCareId(userId, pdcId).stream().findAny();
    }
}
