package ipbhalle.de.server.data.interfaces;

import ipbhalle.de.server.services.interfaces.PageResult;
import ipbhalle.de.server.services.interfaces.QueryCommand;

public interface IPagedDataRepository<TDTO extends DTO<TKey>, TPageDTO extends DTO<TKey> ,TKey extends Comparable<TKey>>
    extends IDataRepository<TDTO, TKey>
{
    PageResult<TDTO> GetPage(QueryCommand query);
}
