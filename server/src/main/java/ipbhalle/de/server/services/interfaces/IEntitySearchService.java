package ipbhalle.de.server.services.interfaces;

import java.util.List;

import ipbhalle.de.server.data.dtos.EntitySearchResultDTO;

public interface IEntitySearchService {
    List<EntitySearchResultDTO> FindEntities(String query);

}
