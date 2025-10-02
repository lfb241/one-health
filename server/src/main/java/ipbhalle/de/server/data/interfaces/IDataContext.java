package ipbhalle.de.server.data.interfaces;

import ipbhalle.de.server.data.dtos.EntityDTO;
import ipbhalle.de.server.data.dtos.EntityTypeDTO;

public abstract class IDataContext {
    private IPagedDataRepository<EntityTypeDTO, EntityTypeDTO, String> entityTypes;

}
