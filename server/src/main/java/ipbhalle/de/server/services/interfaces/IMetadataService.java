package ipbhalle.de.server.services.interfaces;

import java.util.List;

import ipbhalle.de.server.data.dtos.GraphDTO;
import ipbhalle.de.server.data.dtos.MetadataElementDTO;
import ipbhalle.de.server.data.dtos.MetadataSummaryDTO;
import ipbhalle.de.server.data.dtos.SelectableOption;

public interface IMetadataService {
    GraphDTO GetAll();

    MetadataElementDTO GetEntityType(String id);
    MetadataElementDTO GetLinkType(String id);

    MetadataSummaryDTO GetSummary();
    List<SelectableOption<String>> GetAllAsOptions();
}
