package com.example.demo.controller;

import com.example.demo.DTO.PetDayCareDTO;
import com.example.demo.service.PetDayCareService;
import com.example.demo.service.UserFavoritePetDayCareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/petDayCare")
public class PetDayCareController {
    private PetDayCareService petDayCareService;
    private UserFavoritePetDayCareService userFavoritePetDayCareService;

    @Autowired
    public PetDayCareController(PetDayCareService petDayCareService, UserFavoritePetDayCareService userFavoritePetDayCareService) {
        this.petDayCareService = petDayCareService;
        this.userFavoritePetDayCareService = userFavoritePetDayCareService;
    }

    @PostMapping()
    public PetDayCareDTO save(@RequestBody PetDayCareDTO petDayCareDTO) {
        return petDayCareService.save(petDayCareDTO);
    }

    @GetMapping("/all")
    public List<PetDayCareDTO> petDayCareList(@RequestParam(value = "userId", required = false) Integer userId,
                                              @RequestParam(value = "favorite", required = false, defaultValue = "false") Boolean favorite) {
        return userId == null ? petDayCareService.findAll() : userFavoritePetDayCareService.findAllByUser(userId);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") Integer id) { // importante la anotacion PathVariable que es la que me llega en la ruta para buscar por id y poder borrar
        return petDayCareService.delete(id);
    }

    @GetMapping("/category/{category}")
    public List<PetDayCareDTO> findByCategory(@PathVariable("category") Integer type, @RequestParam(value = "userId", required = false) Integer userId) {
        return userId == null ? petDayCareService.findByCategory(type) : userFavoritePetDayCareService.findByCategoryByUserId(type, userId);
    }

    @GetMapping("/detail/{id}")
    public PetDayCareDTO detail(@PathVariable("id") Integer id, @RequestParam(value = "userId", required = false) Integer userId) {
        return userId == null ? petDayCareService.detail(id) : userFavoritePetDayCareService.detail(id, userId);
    }

    @PutMapping("/edit")
    public PetDayCareDTO edit(@RequestBody PetDayCareDTO petDayCareDTO) {
        return petDayCareService.edit(petDayCareDTO);
    }

    @GetMapping("/favorites")
    public List<PetDayCareDTO> petDayCareList(@RequestParam(value = "userId") Integer userId){
        return userFavoritePetDayCareService.findAllByUserFiltered(userId);
    }

}
