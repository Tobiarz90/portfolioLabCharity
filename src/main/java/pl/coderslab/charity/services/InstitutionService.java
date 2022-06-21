package pl.coderslab.charity.services;

import org.springframework.stereotype.Service;
import pl.coderslab.charity.entities.Institution;
import pl.coderslab.charity.repositories.InstitutionRepository;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class InstitutionService {

    private final InstitutionRepository repository;

    public InstitutionService(InstitutionRepository repository) {
        this.repository = repository;
    }

    public Map<Institution, Institution> getInstitutionDTO() {
        List<Institution> institutions = repository.findAll();

        if (institutions.size() % 2 != 0) {
            Institution institution = institutions.get(institutions.size() - 1);
            institutions.remove(institution);

            Map<Institution, Institution> institutionMap = buildInstitutionMap(institutions);

            institutionMap.put(institution, null);

            return institutionMap;
        }

        return buildInstitutionMap(institutions);
    }

    private Map<Institution, Institution> buildInstitutionMap(List<Institution> institutions) {
        Map<Institution, Institution> institutionMap = new LinkedHashMap<>();

        for (int i = 0; i < institutions.size(); i += 2) {
            institutionMap.put(institutions.get(i), institutions.get(i + 1));
        }

        return institutionMap;
    }
}
