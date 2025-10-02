package ipbhalle.de.server.services.interfaces;

import java.util.List;

import ipbhalle.de.server.data.dtos.*;

public interface IGraphService {
    GraphDTO GetInitialSet();
    GraphDTO GetAdjacentNodes(String nodeId, List<String> nodes);
    EntityDTO GetNode(String nodeId);
    GraphLinkDTO GetLink(String nodeId);
    List<LinkDTO> GetLinks (String sourceId, String targetId, String type);
}
