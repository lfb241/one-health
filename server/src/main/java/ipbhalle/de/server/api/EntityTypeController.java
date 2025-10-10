package ipbhalle.de.server.api;

import org.springframework.web.bind.annotation.*;

import ipbhalle.de.server.api.interfaces.DataController;
import ipbhalle.de.server.api.interfaces.PagedDataController;
import ipbhalle.de.server.data.dtos.EntityTypeDTO;
import ipbhalle.de.server.data.dtos.SelectableOption;
import ipbhalle.de.server.services.interfaces.IEntityTypeService;

import java.util.List;

@RestController
@RequestMapping(path="api/entity-type")
@CrossOrigin(origins = "*") // TODO: make this inheritable ? and use an env variable
public class EntityTypeController extends PagedDataController<EntityTypeDTO, EntityTypeDTO, String> {

    private final IEntityTypeService entityTypeService;
    public EntityTypeController(IEntityTypeService crudHandler) {

        super(crudHandler);
        this.entityTypeService = crudHandler;
    }

    @GetMapping("as-options")
    public List<SelectableOption<String>> getAllEntityTypesAsOptions() {
        return entityTypeService.getEntityTypeAsOptions();
    }

}
