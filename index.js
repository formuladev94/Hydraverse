// FUNCIONALIDAD DE LA BARRA DE NAVEGACIÓN ////

document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('.navbar').offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});


// FUNCIONALIDAD DEL MENU HAMBURGUESA ////

document.addEventListener('DOMContentLoaded', function() {

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {

            navLinks.classList.toggle('active');

            menuToggle.classList.toggle('open');

        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('open');
                }
            });
        });
    }
});



// FUNCIONALIDAD DEL MODAL DE RECURSOS ////

// Se define la funcionalidad en una función para ser llamada al cargar el DOM
function initProjectCards() {
    // 💡 CORRECCIÓN PRINCIPAL 1: Definición de la variable del contenedor
    const resourcesContainer = document.getElementById('resources-container');
    const modal = document.getElementById('resource-modal');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');

    if (!resourcesContainer) {
        console.error('Error: No se encontró el elemento #resources-container. Asegúrate de que existe en el HTML.');
        return; 
    }

    let allResources = [];

    async function fetchResources() {
        try {
            const response = await fetch('data.json');
            const data = await response.json();
            
            allResources = data.proyectos;
            renderResources(allResources);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
            resourcesContainer.innerHTML = '<p>Lo sentimos, no pudimos cargar los proyectos.</p>';
        }
    }

    function renderResources(proyectos) {
        resourcesContainer.innerHTML = '';
        
        if (proyectos.length === 0) {
            resourcesContainer.innerHTML = '<p>No se encontraron resultados.</p>';
            return;
        }

        proyectos.forEach(proyecto => {
            const card = document.createElement('div');
            card.classList.add('resource-card');
            
            card.setAttribute('data-resource-id', proyecto.id);

            // --- CONTENIDO DE LA TARJETA ---
            card.innerHTML = `
                <img src="${proyecto.imagen_url}" alt="${proyecto.titulo}">
                <h3>${proyecto.titulo}</h3>
                <h4>${proyecto.nominacion_challenge}</h4>
                <p>${proyecto.descripcion_corta}</p>
            `;

            resourcesContainer.appendChild(card);
        });

        // Agregar listeners de clic a todas las tarjetas después de crearlas
        document.querySelectorAll('.resource-card').forEach(card => {
            card.addEventListener('click', () => {
                const resourceId = parseInt(card.getAttribute('data-resource-id'));
                const resource = allResources.find(res => res.id === resourceId);
                
                if (resource) {
                    // --- CONTENIDO DEL MODAL (con enlaces actualizados) ---
                    modalBody.innerHTML = `
                        <img src="${resource.imagen_url}" alt="${resource.titulo}">
                        <h3>${resource.titulo}</h3>
                        <p>${resource.contenido_completo}</p>
                        <div class="modal-buttons">
                            <a href="${resource.nasa_space_apps_challenge}" target="_blank" class="btn-modal spaceapps-btn">NASA Space Apps Challege</a>
                            <a href="${resource.demo}" target="_blank" class="btn-modal demo-btn">DEMO</a>
                        </div>
                    `;
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }//

    // Manejar el cierre del modal
    if(closeButton) {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Cerrar el modal al hacer clic fuera de la ventana
    if (modal) {
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 💡 INICIALIZACIÓN: Llama a la función de carga al final de la inicialización.
    fetchResources();
}

// 💡 CORRECCIÓN PRINCIPAL 2: Aseguramos la inicialización solo cuando el DOM está listo.
document.addEventListener('DOMContentLoaded', initProjectCards);
