package de.ipb_halle.server.services;

import org.openscience.cdk.DefaultChemObjectBuilder;
import org.openscience.cdk.exception.CDKException;
import org.openscience.cdk.interfaces.IAtomContainer;
import org.openscience.cdk.smiles.SmiFlavor;
import org.openscience.cdk.smiles.SmilesGenerator;
import org.openscience.cdk.smiles.SmilesParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.ipb_halle.server.data.dtos.EntityDTO;
import de.ipb_halle.server.data.interfaces.IEntityRepository;
import de.ipb_halle.server.data.interfaces.IEntitySearchRepository;
import de.ipb_halle.server.services.interfaces.IEntitySearchService;
import de.ipb_halle.server.utils.security.StringProcessing;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class EntitySearchService implements IEntitySearchService {

    private final IEntitySearchRepository entitySearchRepository;
    private final IEntityRepository entityRepository;


    @Autowired
    public EntitySearchService(IEntitySearchRepository entitySearchRepository, IEntityRepository entityRepository) {
        this.entitySearchRepository = entitySearchRepository;
        this.entityRepository = entityRepository;


    }


    public boolean IdentifySmiles(String query) {

        Set<Character> VALID_SMILES_CHARS = new HashSet<>(
                Arrays.asList('B', 'C', 'N', 'O', 'F', 'P', 'S', 'l', 'r', 'I', 'H',
                        'b', 'c', 'n', 'o', 'p', 's', '[', ']', '(', ')', '=', '#', '-', '+', '@', '/', '\\', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0')
        );


        if (query == null || query.isEmpty()) return false;

        for (int i = 0; i < query.length(); i++) {
            char ch = query.charAt(i);
            if (!VALID_SMILES_CHARS.contains(ch)) {
                return false;
            }
        }

        // Check for balanced parentheses
        int paren = 0;
        for (char ch : query.toCharArray()) {
            if (ch == '(') paren++;
            else if (ch == ')') paren--;
            if (paren < 0) return false;
        }
        if (paren != 0) return false;

        return true;
    }


    @Override
    public List<EntityDTO> FindEntities(String query) {


        if (StringProcessing.isSQLInjection(query)) {
            throw new RuntimeException();
        }
        var ids = entitySearchRepository.FindMatchingEntityIds(query);

        if (IdentifySmiles(query)){
            SmilesParser parser = new SmilesParser(DefaultChemObjectBuilder.getInstance());
            SmilesGenerator generator = new SmilesGenerator(SmiFlavor.Unique);

            try {
                IAtomContainer molecule = parser.parseSmiles(query);
                String canonicalSmiles = generator.create(molecule);
                ids.addAll(entitySearchRepository.FindMatchingEntityIds(canonicalSmiles));
            } catch (CDKException ignored) {
            }
        }
        return entityRepository.GetNodes(ids.stream().distinct().toList());

    }

}



