package ipbhalle.de.server.data.interfaces;

import ipbhalle.de.server.data.dtos.DataSourceDTO;
import ipbhalle.de.server.data.dtos.EntityTypeMappingDTO;
import ipbhalle.de.server.data.dtos.LinkTypeMappingDTO;

public interface IDataSourceRepository extends IPagedDataRepository<DataSourceDTO, DataSourceDTO, String> {

    String MapEntities(String id, EntityTypeMappingDTO mapping);

    String MapLinks(String id, LinkTypeMappingDTO mapping);
}
