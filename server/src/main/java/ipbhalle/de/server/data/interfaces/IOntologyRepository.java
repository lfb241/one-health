package ipbhalle.de.server.data.interfaces;

import java.util.List;

import ipbhalle.de.server.data.dtos.CoOcurrenceQuery;
import ipbhalle.de.server.data.dtos.EntityDTO;
import ipbhalle.de.server.data.dtos.GraphDTO;
import ipbhalle.de.server.data.dtos.LinkDTO;

public interface IOntologyRepository extends IGraphRepository {
    List<EntityDTO> GetAsGraph();

    GraphDTO FindCoOccurrences(CoOcurrenceQuery query);
    List<LinkDTO> FindCoOccurrencesDetails(CoOcurrenceQuery query);
}
