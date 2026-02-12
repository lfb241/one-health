package de.ipb_halle.server.services;

import de.ipb_halle.server.data.dtos.EntityDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.ipb_halle.server.data.interfaces.IEntityRepository;
import de.ipb_halle.server.data.interfaces.IEntitySearchRepository;
import de.ipb_halle.server.services.interfaces.IEntitySearchService;
import de.ipb_halle.server.utils.security.StringProcessing;

import java.util.List;

@Service
public class EntitySearchService implements IEntitySearchService {

    private final IEntitySearchRepository entitySearchRepository;
    private final IEntityRepository entityRepository;

    @Autowired
    public EntitySearchService(IEntitySearchRepository entitySearchRepository, IEntityRepository entityRepository) {
        this.entitySearchRepository = entitySearchRepository;
        this.entityRepository = entityRepository;
    }

    @Override
    public List<EntityDTO> FindEntities(String query) {
        if (StringProcessing.isSQLInjection(query)) {
            throw new RuntimeException();
        }
        var ids = entitySearchRepository.FindMatchingEntityIds(query);
        return entityRepository.GetNodes(ids);
    }
}
