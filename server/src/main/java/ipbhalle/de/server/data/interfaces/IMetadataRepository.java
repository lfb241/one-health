package ipbhalle.de.server.data.interfaces;

import org.springframework.stereotype.Repository;

import ipbhalle.de.server.data.dtos.GraphDTO;
import ipbhalle.de.server.data.dtos.MetadataElementDTO;
import ipbhalle.de.server.data.dtos.MetadataSummaryDTO;
import ipbhalle.de.server.data.dtos.SelectableOption;

import java.util.List;

public interface IMetadataRepository {
    GraphDTO GetAll();
    MetadataElementDTO GetEntityType(String id);
    MetadataElementDTO GetLinkType(String id);
    MetadataSummaryDTO GetSummary ();
    List<SelectableOption<String>> getAllAsOptions();

}
