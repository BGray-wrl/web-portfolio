document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById("contact-form");
  const feedbackElement = document.getElementById("feedback"); // Assuming there's a feedback element in the HTML
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const submitButton = document.getElementById("submit-button");
      submitButton.disabled = true;

      const formData = new FormData(contactForm);
      const data = {};
      formData.forEach((value, key) => (data[key] = value));

      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "CSRF-Token": document.querySelector('input[name="_csrf"]').value
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => {
        console.log("Form submission successful:", data);
        feedbackElement.innerHTML = "<div class='alert alert-success'>Thank you for your message. We will get back to you shortly.</div>";
        feedbackElement.style.display = "block"; // Ensure the feedbackElement is visible
        submitButton.disabled = false;
        contactForm.reset(); // Reset the form fields for possible next submission
      })
      .catch(error => {
        console.error("Error during form submission:", error);
        feedbackElement.innerHTML = "<div class='alert alert-danger'>There was an error submitting your form. Please try again.</div>";
        feedbackElement.style.display = "block"; // Ensure the feedbackElement is visible even on error
        submitButton.disabled = false;
      });
    });
  }
});