package IntegradorDH.demo.model;

public class Person {

    private Integer id;
    private String name;
    private String lastName;
    private String email;
    private String passwork;
    private String cellPhone;
    private String address;
    private String type;

    public Person(Integer id, String name, String lastName, String email, String passwork, String cellPhone, String address, String type) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.passwork = passwork;
        this.cellPhone = cellPhone;
        this.address = address;
        this.type = type;
    }
}