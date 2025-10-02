package ipbhalle.de.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ipbhalle.de.server.data.dtos.EntitySearchResultDTO;
import ipbhalle.de.server.data.interfaces.IEntityRepository;
import ipbhalle.de.server.data.interfaces.IEntitySearchRepository;
import ipbhalle.de.server.data.interfaces.IEntityTypeRepository;
import ipbhalle.de.server.services.interfaces.IEntitySearchService;
import ipbhalle.de.server.services.interfaces.IEntityService;
import ipbhalle.de.server.utils.security.StringProcessing;

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
    public List<EntitySearchResultDTO> FindEntities(String query) {
        if (StringProcessing.isSQLInjection(query)) {
            throw new RuntimeException();
        }
        var ids = entitySearchRepository.FindMatchingEntityIds(query);
        return entityRepository.GetByIds(ids);
    }
}
