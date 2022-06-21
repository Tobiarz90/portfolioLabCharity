package pl.coderslab.charity;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.coderslab.charity.entities.Institution;
import pl.coderslab.charity.repositories.DonationRepository;
import pl.coderslab.charity.services.DonationService;
import pl.coderslab.charity.services.InstitutionService;

import java.util.Map;


@Controller
public class HomeController {

    private final InstitutionService institutionService;

    private final DonationService donationService;

    public HomeController(InstitutionService institutionService, DonationRepository donationRepository, DonationService donationService, DonationRepository donationRepository1) {
        this.institutionService = institutionService;
        this.donationService = donationService;
    }

    @RequestMapping("/")
    public String homeAction(Model model) {
        /*
         TODO: InstitutionDTO
          private Institution left;
          private Institution right;
         */
        Map<Institution, Institution> institutionDTO = institutionService.getInstitutionDTO();
        model.addAttribute("institutionDTO", institutionDTO);

        model.addAttribute("donationsTotal", donationService.countAll());
        model.addAttribute("bagsTotal", donationService.countTotalBags());

        return "index";
    }
}
