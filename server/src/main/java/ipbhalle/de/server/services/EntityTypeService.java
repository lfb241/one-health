package ipbhalle.de.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ipbhalle.de.server.data.dtos.EntityTypeDTO;
import ipbhalle.de.server.data.dtos.SelectableOption;
import ipbhalle.de.server.data.interfaces.IEntityTypeRepository;
import ipbhalle.de.server.services.interfaces.IEntityTypeService;
import ipbhalle.de.server.services.interfaces.PageResult;
import ipbhalle.de.server.services.interfaces.QueryCommand;

import java.util.List;

@Service
public class EntityTypeService implements IEntityTypeService {

    private final IEntityTypeRepository entityRepository;

    @Autowired
    public EntityTypeService(IEntityTypeRepository entityRepository) {
        this.entityRepository = entityRepository;
    }

    @Override
    public EntityTypeDTO Create(EntityTypeDTO dto) {
        return entityRepository.Create(dto);
    }

    @Override
    public void Delete(String id) {
        entityRepository.Delete(id);
    }

    @Override
    public EntityTypeDTO Get(String id) {

        return entityRepository.Get(id);
    }

    @Override
    public List<EntityTypeDTO> GetAll() {

        return entityRepository.GetAll();
    }

    @Override
    public PageResult<EntityTypeDTO> GetPage(QueryCommand queryCommand) {
        var items = entityRepository.GetAll();
        return new PageResult<>(items.size(), items);
    }


    @Override
    public EntityTypeDTO Update(EntityTypeDTO dto) {
        return entityRepository.Update(dto);
    }

    @Override
    public List<SelectableOption<String>> getEntityTypeAsOptions() {
        return entityRepository.getEntityTypeAsOptions();
    }
}
