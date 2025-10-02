package ipbhalle.de.server.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ipbhalle.de.server.api.interfaces.GraphController;
import ipbhalle.de.server.data.dtos.CoOcurrenceQuery;
import ipbhalle.de.server.data.dtos.EntityDTO;
import ipbhalle.de.server.data.dtos.GraphDTO;
import ipbhalle.de.server.data.dtos.LinkDTO;
import ipbhalle.de.server.services.interfaces.IEntityService;
import ipbhalle.de.server.services.interfaces.IOntologyService;

import java.util.List;

@RestController
@RequestMapping(path="api/entity")
@CrossOrigin(origins = "*") // TODO: make this inheritable ? and use an env variable
public class EntityController extends GraphController {

    private IEntityService entityService;

    public EntityController(IEntityService entityService) {
        super(entityService);
        this.entityService = entityService;
    }

    @PostMapping("get-graph-references")
    public ResponseEntity<List<LinkDTO>> GetGraphReferences(@RequestBody List<String> nodes) {
        return new ResponseEntity<>(entityService.GetGraphReferences(nodes), HttpStatus.OK);
    }

}
