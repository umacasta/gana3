document.addEventListener("DOMContentLoaded", () => {
    console.log("Página cargada correctamente.");

    const whatsappBtn = document.getElementById("whatsapp-link");

    if (whatsappBtn) {
        whatsappBtn.addEventListener("click", () => {
            // Evento de Meta Pixel (cliente)
            if (typeof fbq !== "undefined") {
                fbq('track', 'Lead');
            }

            // Evento Conversion API (servidor) sin email
            fetch('/api/conversion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event_name: 'Lead'
                })
            }).then(res => {
                console.log("Evento Lead enviado a Meta API");
            }).catch(err => {
                console.error("Error enviando evento a Meta:", err);
            });
        });
    }
});
