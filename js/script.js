// 1. Obtiene una referencia al carrusel
const multiItemCarousel = document.getElementById('eventCarousel');

if (multiItemCarousel) {
    
    // 2. Obtiene las partes necesarias para el cálculo
    const carouselInnerRow = multiItemCarousel.querySelector('.row');
    const items = multiItemCarousel.querySelectorAll('.col'); 
    
    // 3. Define la posición inicial y los límites
    let scrollPosition = 0;
    const totalItems = items.length;
    const itemsPerSlide = 3; // Número de tarjetas visibles en escritorio

    // 4. Agrega un Listener para interceptar el clic de los botones de Bootstrap
    multiItemCarousel.addEventListener('slide.bs.carousel', function (e) {
        
        // **EL POR QUÉ:** Solo queremos esta lógica en escritorio. En móvil, queremos que Bootstrap
        // funcione por defecto (mostrando 1 tarjeta y deslizando al siguiente item, si hubiera).
        if (window.innerWidth >= 768) { 
            
            // e.preventDefault(); // Desactivamos el deslizamiento nativo de Bootstrap
            
            let newPosition = scrollPosition;

            if (e.direction === 'next') {
                newPosition++;
                // Ciclo: Si estamos en el penúltimo grupo visible, volvemos a la primera posición
                if (newPosition > (totalItems - itemsPerSlide)) {
                    newPosition = 0;
                }
            } else if (e.direction === 'prev') {
                newPosition--;
                // Ciclo: Si vamos antes del inicio (posición 0), vamos al último grupo
                if (newPosition < 0) {
                    newPosition = totalItems - itemsPerSlide;
                }
            }
            
            scrollPosition = newPosition;

            // Calcula el desplazamiento: 100% / 3 (el porcentaje que ocupa cada tarjeta visible)
            const percentageToMove = (100 / itemsPerSlide) * scrollPosition;
            
            // Aplica la transformación para mover la fila horizontalmente
            carouselInnerRow.style.transform = `translateX(-${percentageToMove}%)`;
        }
    });
}