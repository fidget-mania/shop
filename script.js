document.addEventListener('DOMContentLoaded', () => {
    const orderButtons = document.querySelectorAll('.order-btn');
    const orderModal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalOrderForm = document.getElementById('modal-order-form');
    const qrContainer = document.getElementById('qr-code-container');
    const qrImg = document.getElementById('qr-code-img');

    // --- NASTAVENÍ PLATEB ---
    const bankAccount = "TVOJE_CISLO_UCTU"; // Formát: 123456789/0100
    const iban = "CZXXXXXXXXXXXXXXXXXXXXXX"; // Tvůj IBAN (najdeš v bankovnictví)
    const price = 149.90;
    const currency = "CZK";

    // Otevření modalu
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            orderModal.style.display = 'flex';
            qrContainer.style.display = 'none'; // Schovat QR kód při novém otevření
        });
    });

    // Zavření modalu
    const closeModal = () => {
        orderModal.style.display = 'none';
    };

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target == orderModal) closeModal(); });

    // Zpracování objednávky
    modalOrderForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('modal-name').value;
        const address = document.getElementById('modal-address').value;
        const phone = document.getElementById('modal-phone').value;
        const productName = "Fidget Otaceci Hracka";

        // Vyčištění telefonu pro variabilní symbol (pouze číslice)
        const vs = phone.replace(/\D/g, '').slice(-10); 

        // Generování URL pro QR platbu přes Paylibo API
        // Parametry: účet, kód banky, částka, měna, VS, zpráva
        const accountParts = bankAccount.split('/');
        const accNumber = accountParts[0];
        const bankCode = accountParts[1];
        
        const message = `Objednavka ${name}`;
        const qrUrl = `https://api.paylibo.com/paylibo/generator/czech/image?accountNumber=${accNumber}&bankCode=${bankCode}&amount=${price}&currency=${currency}&vs=${vs}&message=${encodeURIComponent(message)}`;

        // Zobrazení QR kódu zákazníkovi
        qrImg.src = qrUrl;
        qrContainer.style.display = 'block';

        // Příprava dat pro prodejce (SMS zpráva)
        const smsText = `Fidget Mania: Objednavka!
Zbozi: ${productName}
Zakaznik: ${name}
Adresa: ${address}
Tel: ${phone}
VS: ${vs}`;

        // Odeslání SMS na tvé číslo
        const myPhoneNumber = '792761604';
        
        // Malá pauza, aby uživatel viděl, že se web "hýbe", než ho to hodí do SMS
        setTimeout(() => {
            window.location.href = `sms:${myPhoneNumber}?body=${encodeURIComponent(smsText)}`;
        }, 1500);

        alert('Objednávka byla zpracována! Níže se zobrazil QR kód pro platbu. Po zavření okna budete přesměrováni na odeslání potvrzovací SMS.');
    });

    // Kontaktní formulář
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Děkujeme za zprávu! Ozveme se vám.');
            contactForm.reset();
        });
    }
});

