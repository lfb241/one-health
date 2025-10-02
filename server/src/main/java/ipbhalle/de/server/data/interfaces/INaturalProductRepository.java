package ipbhalle.de.server.data.interfaces;

import java.util.List;

import ipbhalle.de.server.data.dtos.NaturalProductDTO;
import ipbhalle.de.server.data.query.NaturalProductStructureQuery;

public interface INaturalProductRepository {
    NaturalProductDTO GetBySMILES(String value);
    NaturalProductDTO GetByInChI(String value);
    NaturalProductDTO GetByInChIKey(String value);
    List<NaturalProductDTO> GetBySubstructure(String smiles, int take, int page);
    List<NaturalProductDTO> GetBySimilarity(String smiles, int threshold, int limit);

}
