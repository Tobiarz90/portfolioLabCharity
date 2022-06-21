package pl.coderslab.charity.services;

import org.springframework.stereotype.Service;
import pl.coderslab.charity.entities.Donation;
import pl.coderslab.charity.repositories.DonationRepository;

@Service
public class DonationService {

    private final DonationRepository repository;

    public DonationService(DonationRepository repository) {
        this.repository = repository;
    }

    public Integer countTotalBags() {
        return repository.findAll().stream()
                .map(Donation::getQuantity)
                .reduce(0, Integer::sum);
    }

    public Long countAll() {
        return repository.count();
    }
}
