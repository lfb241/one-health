package de.ipb_halle.server.data.dtos;

public class SynonymDTO
{
    private String name;

    public SynonymDTO() {}
    public SynonymDTO(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
