package com.example.demo.service;


import com.example.demo.DTO.PetDayCareDTO;
import com.example.demo.entity.Category;
import com.example.demo.entity.Favorite;
import com.example.demo.entity.PetDayCare;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.CityMapper;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.PetDayCareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserFavoritePetDayCareService {

    private PetDayCareService petDayCareService;
    private FavoriteService favoriteService;

    @Autowired
    public UserFavoritePetDayCareService(PetDayCareService petDayCareService, FavoriteService favoriteService) {
        this.petDayCareService = petDayCareService;
        this.favoriteService = favoriteService;
    }

    public List<PetDayCareDTO> findAllByUserFiltered(Integer userId) {
        return findAllByUser(userId).stream().filter(PetDayCareDTO::isFavorite).toList();
    }

    public List<PetDayCareDTO> findAllByUser(Integer userId) {
        var pdcList = petDayCareService.findAll();
        return setFavoritesToPdcs(pdcList, userId);
    }


    public List<PetDayCareDTO> findByCategoryByUserId(Integer type, Integer userId) {
        var pdcList = petDayCareService.findByCategory(type);
        return setFavoritesToPdcs(pdcList, userId);
    }

    public PetDayCareDTO detail(Integer id, Integer userId) {
        PetDayCareDTO pdc = petDayCareService.detail(id);
        var favList = favoriteService.findAllByUser(userId).stream().map(Favorite::getIdFavorite).toList();
        return determineFavorite(favList, pdc);
    }

    private PetDayCareDTO determineFavorite(List<Integer> favIds, PetDayCareDTO petDayCareDTO){
        petDayCareDTO.setFavorite(favIds.contains(petDayCareDTO.getId()));
        return petDayCareDTO;
    }

    private List<PetDayCareDTO> setFavoritesToPdcs(List<PetDayCareDTO> pdcList, Integer userId){
        var favList = favoriteService.findAllByUser(userId).stream().map(Favorite::getIdFavorite).toList();

        return pdcList.stream().map(pdc -> determineFavorite(favList, pdc)).toList();
    }
}