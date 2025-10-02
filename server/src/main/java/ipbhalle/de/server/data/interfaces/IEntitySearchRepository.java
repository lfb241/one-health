package ipbhalle.de.server.data.interfaces;

import java.util.List;

public interface IEntitySearchRepository {
    List<String> FindMatchingEntityIds(String query);
}
