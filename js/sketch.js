
document.addEventListener("DOMContentLoaded", function() {
    const bannerImages = [
      'assets/wall1.jpg',
      'assets/wall2.jpg',
      'assets/wall3.jpg', 
    ];
  
    let currentImageIndex = 0;
    const banner = document.querySelector('.banner');
  
    function changebannerImage() {
      // Cambiar la imagen de fondo cada 1 segundo
      banner.style.backgroundImage = `url(${bannerImages[currentImageIndex]})`;
      currentImageIndex = (currentImageIndex + 1) % bannerImages.length; // Ciclar las imágenes
    }
  
    // Cambia la imagen cada 1 segundo
    setInterval(changebannerImage, 5000);
  });
  

  // animacion boton menu------------------------------------------------

  const botonMenu = document.querySelector('.botonmenu');
  const botonMenuDesplegable = document.querySelector('.botonmenudesplegable');
  const botonCerrar = document.querySelector('.cerrar');
  const links = botonMenuDesplegable.querySelectorAll('a'); // Seleccionamos todos los enlaces del menú desplegable

  // Al hacer clic en el botón "Menú"
  botonMenu.addEventListener('click', () => {
    // Oculta el botón de menú y muestra el menú desplegable con la animación
    botonMenu.style.display = 'none'; // Ocultar botón de menú
    botonMenuDesplegable.classList.remove('hide');  // Quitar la animación de salida si existe
    botonMenuDesplegable.style.display = 'block';   // Aseguramos que se vea el menú desplegable
    botonMenuDesplegable.classList.add('show');     // Aplica la animación de entrada

    // Muestra el botón de cerrar con la animación
    botonCerrar.classList.remove('hide');
    botonCerrar.style.display = 'block';
    botonCerrar.classList.add('show');
  });

  // Al hacer clic en el botón "Cerrar"
  botonCerrar.addEventListener('click', () => {
    cerrarMenu();
  });

  // Al hacer clic en los enlaces del menú desplegable
  links.forEach(link => {
    link.addEventListener('click', () => {
      cerrarMenu(); // Cierra el menú al hacer clic en cualquier enlace
    });
  });

  // Función para cerrar el menú y el botón de cerrar
  function cerrarMenu() {
    // Aplica la animación de salida al menú desplegable y al botón cerrar
    botonMenuDesplegable.classList.remove('show');
    botonMenuDesplegable.classList.add('hide');  // Desliza fuera el menú

    botonCerrar.classList.remove('show');
    botonCerrar.classList.add('hide');           // Desliza fuera el botón cerrar

    // Espera a que termine la animación para ocultar completamente los elementos
    setTimeout(() => {
      botonMenuDesplegable.style.display = 'none';  // Oculta el div desplegable
      botonCerrar.style.display = 'none';           // Oculta el botón cerrar
      botonMenu.style.display = 'block';            // Vuelve a mostrar el botón de menú
    }, 500);  // Duración de la animación (500 ms)
  }


  // header----------------------------------------------

  const header = document.getElementById("header");
  let previousScrollPosition = window.pageYOffset;

  window.onscroll = function() {
      let currentScrollPosition = window.pageYOffset;

      // Si el usuario baja, ocultar el header parcialmente (top -50px para ocultar la mitad)
      if (previousScrollPosition < currentScrollPosition && currentScrollPosition > 50) {
          header.style.top = "-20px"; // Desliza el header parcialmente hacia arriba
      } 
      // Si el usuario sube, mostrar el header nuevamente
      else {
          header.style.top = "0";
      }

      previousScrollPosition = currentScrollPosition;
  };


  // servicios despliegue---------------------------------------------

  document.querySelectorAll('.tipodeservicio').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Evita la navegación inmediata

        const targetId = this.getAttribute('href'); // Obtiene el id del div a mostrar
        const targetDiv = document.querySelector(targetId); // Selecciona el div correspondiente

        // Oculta todos los divs desplegables
        document.querySelectorAll('.serviciosdesplegable').forEach(function(div) {
            div.style.display = 'none'; // Oculta los demás divs
            div.classList.remove('activo'); // Remueve la clase 'activo' de todos
            div.style.animation = 'none'; // Detenemos cualquier animación en progreso
        });

        // Muestra el div correspondiente
        targetDiv.style.display = 'block';

        // Forzamos el reinicio de la animación
        setTimeout(function() {
            targetDiv.style.animation = ''; // Reiniciamos la animación
            targetDiv.classList.add('activo'); // Agregamos la clase que reproduce el keyframe
            targetDiv.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
        }, 10); // Pequeño retraso para asegurar que la animación se reinicie
    });
});




/*--------------------------------------efecto holografdico 3d---------------------------------------*/
const carta = document.querySelectorAll(".carta");

function aplicarEfectos(elemento, tipoCircle) {
  const circle = document.createElement("div");
  circle.classList.add(tipoCircle); // Aplica la clase indicada en el atributo data-circle
  elemento.appendChild(circle);

  function updateEffects(x, y) {
    const rect = elemento.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Transformación 3D y sombra
    const xAxis = (centerX - x) / 10;
    const yAxis = (centerY - y) / -10;
    elemento.style.transform = `perspective(400px) rotateX(${yAxis}deg) rotateY(${xAxis}deg) scale(1.1)`;

// Sombra ajustada
const shadowX = (x - rect.left - rect.width / 2) / 8;
const shadowY = (y - rect.top - rect.height / 2) / 15;
elemento.style.boxShadow = `${shadowX}px ${shadowY}px 5px rgba(0, 0, 0, 0.3)`;


    // Posicionamiento de 'circle'
    circle.style.left = `${x - rect.left - 50}px`;
    circle.style.top = `${y - rect.top - 50}px`;
  }

  function handleMouseMove(event) {
    updateEffects(event.clientX, event.clientY);
  }

  elemento.addEventListener("mousemove", handleMouseMove);
  elemento.addEventListener("mouseleave", () => {
    elemento.style.transition = "transform 0.1s ease";
    elemento.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  });
}

// Itera sobre cada carta, aplicando el tipo de círculo según el valor en el atributo `data-circle`
carta.forEach((elemento) => {
  const tipo = elemento.getAttribute("data-circle"); // Obtiene el valor del atributo data-circle
  aplicarEfectos(elemento, tipo);
});

