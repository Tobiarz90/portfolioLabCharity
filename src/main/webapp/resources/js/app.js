document.addEventListener("DOMContentLoaded", function () {

    /**
     * Form Select
     */
    class FormSelect {
        constructor($el) {
            this.$el = $el;
            this.options = [...$el.children];
            this.init();
        }

        init() {
            this.createElements();
            this.addEvents();
            this.$el.parentElement.removeChild(this.$el);
        }

        createElements() {
            // Input for value
            this.valueInput = document.createElement("input");
            this.valueInput.type = "text";
            this.valueInput.name = this.$el.name;

            // Dropdown container
            this.dropdown = document.createElement("div");
            this.dropdown.classList.add("dropdown");

            // List container
            this.ul = document.createElement("ul");

            // All list options
            this.options.forEach((el, i) => {
                const li = document.createElement("li");
                li.dataset.value = el.value;
                li.innerText = el.innerText;

                if (i === 0) {
                    // First clickable option
                    this.current = document.createElement("div");
                    this.current.innerText = el.innerText;
                    this.dropdown.appendChild(this.current);
                    this.valueInput.value = el.value;
                    li.classList.add("selected");
                }

                this.ul.appendChild(li);
            });

            this.dropdown.appendChild(this.ul);
            this.dropdown.appendChild(this.valueInput);
            this.$el.parentElement.appendChild(this.dropdown);
        }

        addEvents() {
            this.dropdown.addEventListener("click", e => {
                const target = e.target;
                this.dropdown.classList.toggle("selecting");

                // Save new value only when clicked on li
                if (target.tagName === "LI") {
                    this.valueInput.value = target.dataset.value;
                    this.current.innerText = target.innerText;
                }
            });
        }
    }

    document.querySelectorAll(".form-group--dropdown select").forEach(el => {
        new FormSelect(el);
    });

    /**
     * Hide elements when clicked on document
     */
    document.addEventListener("click", function (e) {
        const target = e.target;
        const tagName = target.tagName;

        if (target.classList.contains("dropdown")) return false;

        if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
            return false;
        }

        if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
            return false;
        }

        document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
            el.classList.remove("selecting");
        });
    });

    /**
     * Switching between form steps
     */
    class FormSteps {
        constructor(form) {
            this.$form = form;
            this.$next = form.querySelectorAll(".next-step");
            this.$prev = form.querySelectorAll(".prev-step");
            this.$step = form.querySelector(".form--steps-counter span");
            this.currentStep = 1;

            this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
            const $stepForms = form.querySelectorAll("form > div");
            this.slides = [...this.$stepInstructions, ...$stepForms];

            this.init();
        }

        /**
         * Init all methods
         */
        init() {
            this.events();
            this.updateForm();
        }

        /**
         * All events that are happening in form
         */
        events() {
            // Next step
            this.$next.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    this.currentStep++;
                    this.updateForm();
                });
            });

            // Previous step
            this.$prev.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    this.currentStep--;
                    this.updateForm();
                });
            });

            // Form submit
            this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
        }

        /**
         * Update form front-end
         * Show next or previous section etc.
         */
        updateForm() {
            this.$step.innerText = this.currentStep;

            // TODO: Validation

            this.slides.forEach(slide => {
                slide.classList.remove("active");

                if (slide.dataset.step == this.currentStep) {
                    slide.classList.add("active");
                }
            });

            this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 5;
            this.$step.parentElement.hidden = this.currentStep >= 5;

            if (this.currentStep === 5) {
                const categories = this.$form.querySelectorAll("input[name=categories]");
                const quantity = this.$form.querySelector("input[name=quantity]");
                const institutions = this.$form.querySelectorAll("input[name=institution]");

                const street = this.$form.querySelector("input[name=street]");
                const city = this.$form.querySelector("input[name=city]");
                const zipCode = this.$form.querySelector("input[name=zipCode]");

                const pickUpDate = this.$form.querySelector("input[name=pickUpDate]");
                const pickUpTime = this.$form.querySelector("input[name=pickUpTime]");
                const pickUpComment = this.$form.querySelector("textarea[name=pickUpComment]");

                const categoryValue = [...categories]
                    .filter(category => category.checked)
                    .map(category => category.parentElement.querySelector(".description").innerText);

                const quantityValue = quantity.value;
                const institutionValue = [...institutions]
                    .find(institution => institution.checked)
                    .parentElement.querySelector(".description .title").innerText;

                const streetValue = street.value;
                const cityValue = city.value;
                const zipCodeValue = zipCode.value;

                const pickUpDateValue = pickUpDate.value;
                const pickUpTimeValue = pickUpTime.value;
                const pickUpCommentValue = pickUpComment.value;

                const summaryTexts = this.$form.querySelectorAll(".summary .form-section ul > li .summary--text");
                summaryTexts[0].innerText = `${quantityValue} worki ${categoryValue.join(", ")} w dobrym stanie`;
                summaryTexts[1].innerText = `Dla ${institutionValue}`;

                function appendItemsToList(items, list) {
                    items.forEach(item => {
                        const li = document.createElement('li');
                        li.innerText = item;

                        list.appendChild(li);
                    });

                    return list;
                }

                const lists = this.$form.querySelectorAll(".summary .form-section--column");

                const address = [streetValue, cityValue, zipCodeValue];
                let ul = document.createElement("ul");
                lists[0].appendChild(appendItemsToList(address, ul));

                const deliveryInfo = [pickUpDateValue, pickUpTimeValue, pickUpCommentValue];
                ul = document.createElement("ul");
                lists[1].appendChild(appendItemsToList(deliveryInfo, ul));
            }
        }

    }

    const form = document.querySelector(".form--steps");
    if (form !== null) {
        new FormSteps(form);
    }
});
