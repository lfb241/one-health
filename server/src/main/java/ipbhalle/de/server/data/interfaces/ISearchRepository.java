package ipbhalle.de.server.data.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;

import ipbhalle.de.server.postgre.models.PSIndexEntry;

import java.util.List;

public interface ISearchRepository extends JpaRepository<PSIndexEntry, Long> {
}
