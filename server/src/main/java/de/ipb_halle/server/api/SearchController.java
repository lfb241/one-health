package de.ipb_halle.server.api;

import de.ipb_halle.server.data.dtos.EntitySearchResultDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import de.ipb_halle.server.data.dtos.*;
import de.ipb_halle.server.services.interfaces.IEntitySearchService;

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