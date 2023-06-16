package com.example.demo.service;

import com.example.demo.DTO.RoleDTO;
import com.example.demo.entity.Permission;
import com.example.demo.entity.Role;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class RoleService {

    private RoleRepository repository;
    private PermissionService permissionService;

    @Autowired
    public RoleService(RoleRepository repository, PermissionService permissionService) {
        this.repository = repository;
        this.permissionService = permissionService;
    }

    public Role save(RoleDTO roleDTO) {
        if (roleDTO == null) {
            throw new ResourceNotFoundException("El role no puede ser nulo");
        }

        Role role = new Role(
                roleDTO.getName(),
                roleDTO.getId()
        );
        return repository.save(role);
    }

    public Role findById(Integer id) {
        return repository.findById(id).get();
    }

    public Role findByName(String name){
        return repository.findByName(name).get();
    }

    public String deleteById(Integer id) {
        Optional<Role> roleOpt = this.repository.findById(id);

        if (!roleOpt.isPresent()) {
            throw new ResourceNotFoundException("No existe un role registrado con el id: " + id);
        }
        repository.delete(roleOpt.get());
        return "Se elimino exitosamente el role de id: " + id;
    }

    public RoleDTO updateRole(RoleDTO roleDTO) {
        if (roleDTO != null) {
            Optional<Role> roleOpt = repository.findById(roleDTO.getId());
            if (roleOpt.isPresent()) {
                Role role = roleOpt.get();
                role.setName(roleDTO.getName());
                role = repository.save(role);
                roleDTO.setId(role.getId());
                return roleDTO;
            }
        }
        throw new ResourceNotFoundException("El role no existe");
    }

    public void addPermissionToRole(Integer idRole, Integer idPermission) {
        Role role = findById(idRole);
        Permission permission = permissionService.findById(idPermission);

        role.getPermissions().add(permission);

        repository.save(role);
    }

    public void removePermissionFromRole(Integer idPermission, Integer idRole) {
        Permission permission = permissionService.findById(idPermission);
        Role role = findById(idRole);

        if (permission != null && role != null && role.getPermissions().contains(permission)) {
            role.removePermission(permission);
            repository.save(role);
        }
    }

}