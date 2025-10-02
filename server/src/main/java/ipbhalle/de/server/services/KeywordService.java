package ipbhalle.de.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ipbhalle.de.server.data.dtos.KeywordDTO;
import ipbhalle.de.server.data.interfaces.IKeywordRepository;
import ipbhalle.de.server.services.interfaces.IKeywordService;

import java.util.List;

@Service
public class KeywordService implements IKeywordService {

    private final IKeywordRepository keywordRepository;

    @Autowired
    public KeywordService(IKeywordRepository keywordRepository) {
        this.keywordRepository = keywordRepository;
    }

    @Override
    public KeywordDTO Create(KeywordDTO dto) {
        // TODO: Need a restriction for the keyword value to not be empty
        // Also check if the keyword doesn't exist already in that case just return the existent object
        if (dto.getValue().isBlank() || dto.getValue().isEmpty())
            throw new RuntimeException(); // TODO: Customize the exception

        KeywordDTO result = keywordRepository.GetByValue(dto.getValue());

        return result != null ? result : keywordRepository.Create(dto);
    }

    @Override
    public KeywordDTO Update(KeywordDTO dto) {
        return null;
    }

    @Override
    public KeywordDTO Get(String id) {
        return null;
    }

    @Override
    public List<KeywordDTO> GetAll() {
        return keywordRepository.GetAll();
    }

    @Override
    public void Delete(String id) {
        keywordRepository.Delete(id);
    }
}
