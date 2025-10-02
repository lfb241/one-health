package ipbhalle.de.server.data.interfaces;

import ipbhalle.de.server.data.dtos.KeywordDTO;

public interface IKeywordRepository extends IDataRepository<KeywordDTO, String> {
    KeywordDTO GetByValue(String value);
}
