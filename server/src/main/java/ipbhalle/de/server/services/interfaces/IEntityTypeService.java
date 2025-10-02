package ipbhalle.de.server.services.interfaces;

import java.util.List;

import ipbhalle.de.server.data.dtos.EntityTypeDTO;
import ipbhalle.de.server.data.dtos.SelectableOption;

public interface IEntityTypeService extends IPagedCrudHandler<EntityTypeDTO, EntityTypeDTO, String> {

    List<SelectableOption<String>> getEntityTypeAsOptions();

}
