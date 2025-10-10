package ipbhalle.de.server.data.interfaces;

import java.util.List;

import ipbhalle.de.server.data.dtos.*;

public interface IGraphRepository {

    GraphDTO GetInitialSet();
    GraphDTO GetAdjacentNodes(String nodeId, List<String> nodes);
    EntityDTO GetNode(String nodeId);
    GraphLinkDTO GetLink(String linkId);
    List<LinkDTO> GetLinks (String sourceId, String targetId, String type);
}
