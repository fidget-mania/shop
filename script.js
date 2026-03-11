document.addEventListener('DOMContentLoaded', () => {
    // Prvky z HTML
    const orderButtons = document.querySelectorAll('.order-btn');
    const orderModal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalOrderForm = document.getElementById('modal-order-form');
    const qrContainer = document.getElementById('qr-code-container');
    const qrImg = document.getElementById('qr-code-img');

    // --- !!! TADY DOPLŇ SVÉ ÚDAJE !!! ---
    const bankAccount = "123456789/0100"; // Tvoje číslo účtu/kód banky
    const iban = "CZ0000000000000000000000"; // Tvůj IBAN z bankovnictví
    const price = 49.90;
    const myPhoneNumber = '792761604';

    // Otevření modalu při kliknutí na "Objednat"
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            orderModal.style.display = 'flex';
            qrContainer.style.display = 'none'; // Skrýt QR při novém otevření
        });
    });

    // Zavření modalu
    const closeModal = () => {
        orderModal.style.display = 'none';
    };

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target == orderModal) closeModal(); });

    // Hlavní funkce objednávky
    modalOrderForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('modal-name').value;
        const address = document.getElementById('modal-address').value;
        const phone = document.getElementById('modal-phone').value;
        
        // Vytvoření Variabilního Symbolu z telefonu (jen čísla)
        const vs = phone.replace(/\D/g, '').slice(-10);

        // 1. GENEROVÁNÍ QR KÓDU
        const accountParts = bankAccount.split('/');
        const accNumber = accountParts[0];
        const bankCode = accountParts[1];
        
        const qrMessage = `Objednavka ${name}`;
        const qrUrl = `https://api.paylibo.com/paylibo/generator/czech/image?accountNumber=${accNumber}&bankCode=${bankCode}&amount=${price}&currency=CZK&vs=${vs}&message=${encodeURIComponent(qrMessage)}`;

        // Zobrazení QR kódu na webu
        qrImg.src = qrUrl;
        qrContainer.style.display = 'block';

        // 2. PŘÍPRAVA SMS
        const smsText = `Fidget Mania: Objednavka!
Zbozi: Fidget Hracka
Od: ${name}
Adresa: ${address}
VS: ${vs}`;

        alert('Objednávka uložena! Nyní uvidíte QR kód pro platbu. Po zavření tohoto okna se vám otevře SMS pro odeslání objednávky nám.');

        // 3. ODESLÁNÍ SMS (s mírným zpožděním, aby si uživatel stihl všimnout QR kódu)
        setTimeout(() => {
            const encodedMsg = encodeURIComponent(smsText);
            // Speciální formát pro iOS i Android
            const smsUrl = `sms:${myPhoneNumber}${navigator.userAgent.match(/iPhone/i) ? '&' : '?'}body=${encodedMsg}`;
            
            window.location.href = smsUrl;
        }, 2000);
    });

    // Základní kontaktní formulář
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Děkujeme za zprávu! Ozveme se vám co nejdříve.');
            contactForm.reset();
        });
    }
});
                                                  
