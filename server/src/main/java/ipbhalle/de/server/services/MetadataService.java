package ipbhalle.de.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ipbhalle.de.server.data.dtos.GraphDTO;
import ipbhalle.de.server.data.dtos.MetadataElementDTO;
import ipbhalle.de.server.data.dtos.MetadataSummaryDTO;
import ipbhalle.de.server.data.dtos.SelectableOption;
import ipbhalle.de.server.data.interfaces.IKeywordRepository;
import ipbhalle.de.server.data.interfaces.IMetadataRepository;
import ipbhalle.de.server.services.interfaces.IMetadataService;

import java.util.List;


@Service
public class MetadataService implements IMetadataService {

    private final IMetadataRepository metadataRepository;

    @Autowired
    public MetadataService(IMetadataRepository metadataRepository) {
        this.metadataRepository = metadataRepository;
    }

    @Override
    public GraphDTO GetAll() {
        return this.metadataRepository.GetAll();
    }

    @Override
    public MetadataElementDTO GetEntityType(String id) {
        return this.metadataRepository.GetEntityType(id);
    }

    @Override
    public MetadataElementDTO GetLinkType(String id) {
        return this.metadataRepository.GetLinkType(id);
    }

    @Override
    public MetadataSummaryDTO GetSummary() {
        return this.metadataRepository.GetSummary();
    }

    @Override
    public List<SelectableOption<String>> GetAllAsOptions() {
        return metadataRepository.getAllAsOptions();
    }


}
