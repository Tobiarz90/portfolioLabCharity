package pl.coderslab.charity;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.coderslab.charity.entities.Donation;
import pl.coderslab.charity.repositories.CategoryRepository;
import pl.coderslab.charity.repositories.InstitutionRepository;
import pl.coderslab.charity.services.DonationService;

@Controller
@RequestMapping("/form")
public class DonationController {

    private final CategoryRepository categoryRepository;

    private final InstitutionRepository institutionRepository;

    private final DonationService donationService;

    public DonationController(CategoryRepository categoryRepository, InstitutionRepository institutionRepository, DonationService donationService) {
        this.categoryRepository = categoryRepository;
        this.institutionRepository = institutionRepository;
        this.donationService = donationService;
    }

    @GetMapping()
    public String showForm(Model model) {
        model.addAttribute("donation", new Donation());

        model.addAttribute("categories", categoryRepository.findAll());
        model.addAttribute("institutions", institutionRepository.findAll());

        return "form";
    }

    @PostMapping()
    public String processForm(Donation donation) {
        donationService.save(donation);

        return "form-confirmation";
    }

}
