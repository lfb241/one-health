package ipbhalle.de.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ipbhalle.de.server.data.dtos.*;
import ipbhalle.de.server.data.interfaces.IEntityRepository;
import ipbhalle.de.server.data.interfaces.IOntologyRepository;
import ipbhalle.de.server.services.interfaces.IEntityService;
import ipbhalle.de.server.services.interfaces.IGraphService;

import java.util.List;

@Service
public class EntityService implements IEntityService {

    private final IEntityRepository entityRepository;

    @Autowired
    public EntityService(IEntityRepository entityRepository) {
        this.entityRepository = entityRepository;
    }

    @Override
    public GraphDTO GetInitialSet() {
        return entityRepository.GetInitialSet();
    }

    @Override
    public GraphDTO GetAdjacentNodes(String nodeId, List<String> nodes) {
        return entityRepository.GetAdjacentNodes(nodeId, nodes);
    }

    @Override
    public EntityDTO GetNode(String nodeId) {
        return entityRepository.GetNode(nodeId);
    }

    @Override
    public GraphLinkDTO GetLink(String nodeId) {
        return null;
    }

    @Override
    public List<LinkDTO> GetLinks(String sourceId, String targetId, String type) {
        return entityRepository.GetLinks(sourceId, targetId, type);
    }

    @Override
    public List<LinkDTO> GetGraphReferences(List<String> nodesIds){
        return entityRepository.GetGraphReferences(nodesIds);
    }
}
