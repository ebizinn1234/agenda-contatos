document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const contactTableBody = document.getElementById("contactTableBody");
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupText = document.getElementById("popup-text");
    const popupClose = document.getElementById("popup-close");

    const contacts = [];


    const showPopup = (title, message, type) => {
        popupTitle.textContent = title;
        popupText.textContent = message;

        const icon = document.querySelector(".popup-icon");
    
        icon.className = `popup-icon ${type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle"}`;
        icon.style.color = type === "success" ? "#4CAF50" : "#FF0000";

        popup.classList.add("visible");

        
        setTimeout(() => {
            popup.classList.remove("visible");
        }, 3000);
    };

    
    const formatPhone = (value) => {
        value = value.replace(/\D/g, ""); 
        if (value.length > 11) value = value.slice(0, 11); 

        if (value.length > 10) {
            return value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
        } else if (value.length > 6) {
            return value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
        } else if (value.length > 2) {
            return value.replace(/^(\d{2})(\d{0,4})$/, "($1) $2");
        } else if (value.length > 0) {
            return value.replace(/^(\d{0,2})$/, "($1");
        }
        return value;
    };

    
    const phoneInput = document.getElementById("phone");
    phoneInput.addEventListener("input", (event) => {
        event.target.value = formatPhone(event.target.value);
    });

    
    popupClose.addEventListener("click", () => {
        popup.classList.remove("visible");
    });

    
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = document.getElementById("name").value.trim();
        const phoneInputValue = document.getElementById("phone").value.trim();

        
        if (!nameInput || !phoneInputValue) {
            showPopup("Erro", "Por favor, preencha todos os campos!", "error");
            return;
        }

        
        const isDuplicate = contacts.some(
            (contact) => contact.name.toLowerCase() === nameInput.toLowerCase() || contact.phone === phoneInputValue
        );

        if (isDuplicate) {
            showPopup("Erro", "Este nome ou número já foi adicionado!", "error");
            return;
        }

        
        const newContact = { name: nameInput, phone: phoneInputValue };
        contacts.push(newContact);

        
        const newRow = document.createElement("tr");
        const nameCell = document.createElement("td");
        const phoneCell = document.createElement("td");

        nameCell.textContent = newContact.name;
        phoneCell.textContent = newContact.phone;

        newRow.appendChild(nameCell);
        newRow.appendChild(phoneCell);
        contactTableBody.appendChild(newRow);

        showPopup("Sucesso", "Contato adicionado com sucesso!", "success");

        
        form.reset();
    });
});
