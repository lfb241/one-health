package ipbhalle.de.server.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ipbhalle.de.server.api.interfaces.DataController;
import ipbhalle.de.server.api.interfaces.PagedDataController;
import ipbhalle.de.server.data.dtos.LinkTypeDTO;
import ipbhalle.de.server.services.interfaces.IEntityTypeService;
import ipbhalle.de.server.services.interfaces.ILinkTypeService;

@RestController
@RequestMapping(path="api/link-type")
@CrossOrigin(origins = "*") // TODO: make this inheritable ? and use an env variable
public class LinkTypeController extends PagedDataController<LinkTypeDTO, LinkTypeDTO, String> {

    private final ILinkTypeService linkTypeService;
    public LinkTypeController(ILinkTypeService crudHandler) {

        super(crudHandler);
        this.linkTypeService = crudHandler;
    }



}
