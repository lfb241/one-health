package ipbhalle.de.server.services;

import org.springframework.beans.factory.annotation.Autowired;

import ipbhalle.de.server.data.interfaces.ISearchRepository;
import ipbhalle.de.server.services.interfaces.ISearchService;

public class SearchService implements ISearchService {

    private final ISearchRepository searchRepository;

    @Autowired
    SearchService(ISearchRepository searchRepository) {
        this.searchRepository = searchRepository;
    }


    @Override
    public void FindAll(String query) {
    }
}
