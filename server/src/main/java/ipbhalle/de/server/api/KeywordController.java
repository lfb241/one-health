package ipbhalle.de.server.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ipbhalle.de.server.api.interfaces.DataController;
import ipbhalle.de.server.data.dtos.EntityTypeDTO;
import ipbhalle.de.server.data.dtos.KeywordDTO;
import ipbhalle.de.server.services.interfaces.ICrudHandler;
import ipbhalle.de.server.services.interfaces.IKeywordService;

@RestController
@RequestMapping(path="api/keyword")
@CrossOrigin(origins = "*") // TODO: make this inheritable ? and use an env variable
public class KeywordController extends DataController<KeywordDTO, String>  {
    public KeywordController(IKeywordService keywordService) {
        super(keywordService);
    }
}
