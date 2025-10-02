package ipbhalle.de.server.data.interfaces;

import java.util.List;
import java.util.Map;

import ipbhalle.de.server.data.dtos.EntitySearchResultDTO;
import ipbhalle.de.server.data.dtos.LinkDTO;
import ipbhalle.de.server.data.dtos.NaturalProductDTO;

public interface IEntityRepository extends IGraphRepository{
    List<EntitySearchResultDTO> GetByIds(List<String> ids);
    List<LinkDTO> GetGraphReferences(List<String> nodesIds);
}
