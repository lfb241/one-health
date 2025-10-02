package ipbhalle.de.server.data.interfaces;

import java.util.Collection;
import java.util.List;

import ipbhalle.de.server.data.dtos.EntityTypeDTO;
import ipbhalle.de.server.data.dtos.SelectableOption;

public interface IEntityTypeRepository extends IPagedDataRepository<EntityTypeDTO, EntityTypeDTO, String>
{
    List<SelectableOption<String>> getEntityTypeAsOptions();
}
