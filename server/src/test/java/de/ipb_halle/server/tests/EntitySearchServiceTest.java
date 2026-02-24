package de.ipb_halle.server.tests;
import de.ipb_halle.server.data.dtos.EntityDTO;
import de.ipb_halle.server.data.interfaces.IEntityRepository;
import de.ipb_halle.server.data.interfaces.IEntitySearchRepository;
import de.ipb_halle.server.services.EntitySearchService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.stubbing.Answer;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EntitySearchServiceTest {


    @Mock
    private IEntitySearchRepository entitySearchRepository;

    @Mock
    private IEntityRepository entityRepository;

    @InjectMocks
    private EntitySearchService service;

    @Test
    void identifySmiles_nullQuery_returnsFalse() {
        assertThat(service.IdentifySmiles(null)).isFalse();
    }

    @Test
    void identifySmiles_emptyQuery_returnsFalse() {
        assertThat(service.IdentifySmiles("")).isFalse();
    }

    @Test
    void identifySmiles_validSmilesEthanol_returnsTrue() {
        // Ethanol: CCO
        assertThat(service.IdentifySmiles("CCO")).isTrue();
    }

    @Test
    void identifySmiles_validSmilesWithBranches_returnsTrue() {
        // Isobutane
        assertThat(service.IdentifySmiles("CC(C)C")).isTrue();
    }

    @Test
    void identifySmiles_unbalancedParentheses_returnsFalse() {
        assertThat(service.IdentifySmiles("CC(C")).isFalse();
    }

    @Test
    void identifySmiles_closingBeforeOpening_returnsFalse() {
        assertThat(service.IdentifySmiles("CC)C")).isFalse();
    }

    @Test
    void identifySmiles_invalidCharacter_returnsFalse() {
        // 'X' ist kein gültiges SMILES-Zeichen
        assertThat(service.IdentifySmiles("CCX")).isFalse();
    }

    @Test
    void identifySmiles_queryWithSpaces_returnsFalse() {
        assertThat(service.IdentifySmiles("C C O")).isFalse();
    }

    @Test
    void findEntities_sqlInjection_throwsRuntimeException() {
        String malicious = "' OR 1=1 --";
        assertThatThrownBy(() -> service.FindEntities(malicious))
                .isInstanceOf(RuntimeException.class);

        verifyNoInteractions(entitySearchRepository, entityRepository);
    }
    @Test
    void findEntities_normalQuery_delegatesToRepository(){
        String query = "glucose";
        List<String> mockIds = List.of("id_1","id_2");
        List<EntityDTO> mockResult = List.of(new EntityDTO("id_1",null,null), new EntityDTO("id_1",null,null));

        when(entitySearchRepository.FindMatchingEntityIds(query)).thenReturn(mockIds);
        when(entityRepository.GetNodes(mockIds)).thenReturn(mockResult);

        List<EntityDTO> result = service.FindEntities(query);
        assertThat(result).isEqualTo(mockResult);
        assertThat(service.IdentifySmiles(query)).isFalse();

        verify(entitySearchRepository).FindMatchingEntityIds(query);
        verify(entityRepository).GetNodes(mockIds);
    }

    @Test
    void findEntities_validSmilesQuery_addsCanonicalSmiles(){

        String query = "CCO";
        String canonicalSmiles = "OCC";

        List<String> mockIdsWithoutSmiles = new ArrayList<>(List.of("id_1"));
        List<String> mockIdsWithSmiles = new ArrayList<>(List.of("id_2"));
        List<EntityDTO> mockResult = List.of(new EntityDTO("id_1",null,null), new EntityDTO("id_2",null,null));



        when(entitySearchRepository.FindMatchingEntityIds(query)).thenReturn(mockIdsWithoutSmiles);
        when(entitySearchRepository.FindMatchingEntityIds(canonicalSmiles)).thenReturn(mockIdsWithSmiles);
        when(entityRepository.GetNodes(List.of("id_1","id_2"))).thenReturn(mockResult);

        List<EntityDTO> result = service.FindEntities(query);
        assertThat(result).isEqualTo(mockResult);

        verify(entitySearchRepository).FindMatchingEntityIds(query);
        verify(entitySearchRepository).FindMatchingEntityIds(canonicalSmiles);
        verify(entityRepository).GetNodes(List.of("id_1","id_2"));
        verifyNoMoreInteractions(entitySearchRepository);
    }
    @Test
    void findEntities_removesDistinctIds(){

        String query = "glucose";

        List<String> mockId = new ArrayList<>(List.of("id_1", "id_1"));
        List<EntityDTO> mockResult = List.of(new EntityDTO("id_1",null,null));


        when(entitySearchRepository.FindMatchingEntityIds(query)).thenReturn(mockId);
        when(entityRepository.GetNodes(List.of("id_1"))).thenReturn(mockResult);

        List<EntityDTO> result = service.FindEntities(query);
        assertThat(result).isEqualTo(mockResult);

        verify(entitySearchRepository, times(1)).FindMatchingEntityIds(any());
        verify(entityRepository).GetNodes(List.of("id_1"));
        verifyNoMoreInteractions(entitySearchRepository);
    }

    @Test
    void findEntities_emptyRepositoryResult_returnsEmptyList() {
        String query = "unknown";
        when(entitySearchRepository.FindMatchingEntityIds(query)).thenReturn(List.of());
        when(entityRepository.GetNodes(any())).thenReturn(List.of());
        assertThat(service.FindEntities(query)).isEmpty();
    }
}
