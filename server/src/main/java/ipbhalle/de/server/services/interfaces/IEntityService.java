package ipbhalle.de.server.services.interfaces;

import java.util.List;

import ipbhalle.de.server.data.dtos.LinkDTO;

public interface IEntityService extends IGraphService{
    List<LinkDTO> GetGraphReferences(List<String> nodesIds);
}
