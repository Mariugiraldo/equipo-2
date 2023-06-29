package com.example.demo.entity;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "favorite")
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFavorite;

    @ManyToOne
    private User user;
    @ManyToOne
    private PetDayCare petDayCare;


    public Favorite(User user, PetDayCare petDayCare) {
        this.user = user;
        this.petDayCare = petDayCare;
    }

    public Favorite() {
    }

    public Integer getIdFavorite() {
        return idFavorite;
    }

    public void setIdFavorite(Integer idFavorite) {
        this.idFavorite = idFavorite;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PetDayCare getPetDayCare() {
        return petDayCare;
    }

    public void setPetDayCare(PetDayCare petDayCare) {
        this.petDayCare = petDayCare;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Favorite favorite = (Favorite) o;
        return user.getId().equals(favorite.user.getId()) && petDayCare.getId().equals(favorite.petDayCare.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(user.getId(), petDayCare.getId());
    }
}
