document.addEventListener('DOMContentLoaded', () => {
    const orderButtons = document.querySelectorAll('.order-btn');
    const orderModal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalOrderForm = document.getElementById('modal-order-form');

    // Otevření modalu po kliknutí na "Objednat"
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            orderModal.style.display = 'flex';
        });
    });

    // Zavření modalu po kliknutí na "x"
    closeBtn.addEventListener('click', () => {
        orderModal.style.display = 'none';
    });

    // Zavření modalu po kliknutí mimo modal
    window.addEventListener('click', (event) => {
        if (event.target == orderModal) {
            orderModal.style.display = 'none';
        }
    });

    // Zpracování objednávky z modalu
    modalOrderForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Zabrání výchozímu odeslání formuláře

        const customerName = document.getElementById('modal-name').value;
        const customerAddress = document.getElementById('modal-address').value;
        const customerPhone = document.getElementById('modal-phone').value;
        const productName = document.querySelector('.order-btn').dataset.product; // Získání názvu produktu z tlačítka

        // Vytvoření automatické zprávy
        const message = `Nová objednávka z Fidget Mania Shopu!
Produkt: ${productName}
Jméno: ${customerName}
Adresa: ${customerAddress}
Telefon: ${customerPhone}`;

        // Telefonní číslo pro odeslání SMS
        const phoneNumber = '792761604';

        // Otevření SMS aplikace s předvyplněnou zprávou (pro mobilní zařízení)
        // Na desktopu se to chová jinak, ale to je standardní chování
        window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

        alert('Vaše objednávka byla odeslána. Brzy se vám ozveme!');
        orderModal.style.display = 'none'; // Zavřít modal po odeslání
        modalOrderForm.reset(); // Vyčistit formulář
    });

    // Zpracování kontaktního formuláře (základní)
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Zabrání výchozímu odeslání formuláře
        alert('Děkujeme za vaši zprávu! Ozveme se vám co nejdříve.');
        contactForm.reset(); // Vyčistit formulář
    });
});
