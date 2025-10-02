package ipbhalle.de.server.services.interfaces;

import ipbhalle.de.server.data.interfaces.DTO;

public interface IPagedCrudHandler<TDTO extends DTO<TKey>, TPageDTO extends DTO<TKey>, TKey extends Comparable<TKey>>
       extends ICrudHandler<TDTO, TKey>, IDataHandler {
    PageResult<TDTO> GetPage(QueryCommand queryCommand);

}
