package de.ipb_halle.server.services.interfaces;

import java.util.List;

import de.ipb_halle.server.data.dtos.EntitySearchResultDTO;

public interface IEntitySearchService {
    List<EntitySearchResultDTO> FindEntities(String query);

}
