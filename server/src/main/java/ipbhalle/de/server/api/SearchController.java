package ipbhalle.de.server.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import ipbhalle.de.server.api.interfaces.GraphController;
import ipbhalle.de.server.data.dtos.*;
import ipbhalle.de.server.services.interfaces.IEntitySearchService;
import ipbhalle.de.server.services.interfaces.IOntologyService;
import ipbhalle.de.server.services.interfaces.ISearchService;

import java.net.URLDecoder;
import java.util.List;

@RestController
@RequestMapping(path="api/search")
@CrossOrigin(origins = "*") // TODO: make this inheritable ? and use an env variable
public class SearchController {

    private final IEntitySearchService searchService;

    @Autowired
    public SearchController(IEntitySearchService searchService) {
        this.searchService = searchService;
    }


    @GetMapping("{query}")
    public List<EntitySearchResultDTO> SearchTerm(@PathVariable String query){
        return searchService.FindEntities(query);
    }


}


