package com.example.demo.controller;

import com.example.demo.DTO.FavoriteDTO;
import com.example.demo.entity.Favorite;
import com.example.demo.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("api/v1/favorite")
public class FavoriteController {
    private FavoriteService service;

    @Autowired
    public FavoriteController(FavoriteService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity save(@RequestBody FavoriteDTO favorite){
        return service.save(favorite) ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
    }

    @DeleteMapping
    public ResponseEntity delete(@RequestBody FavoriteDTO favorite){
        return service.delete(favorite) ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();

    }
}
