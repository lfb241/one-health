package de.ipb_halle.server.data.interfaces;

import java.util.List;
import java.util.Map;

import de.ipb_halle.server.data.dtos.EntitySearchResultDTO;
import de.ipb_halle.server.data.dtos.LinkDTO;

public interface IEntityRepository extends IGraphRepository{
    List<LinkDTO> GetGraphReferences(List<String> nodesIds);
}
