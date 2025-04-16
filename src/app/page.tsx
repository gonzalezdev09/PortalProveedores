import Link from 'next/link'; // 1. Importa el componente Link

export default function HomePage() {
  // El resto del contenido de tu página principal...

  return (
    <main>
      {/* ... Otro contenido de tu página principal ... */}

      <h1>Bienvenido al Portal</h1>

      {/* 2. Añade el Link con la ruta correcta */}
      <Link href="/pages/UsersManagement"> {/* <-- Reemplaza "/pages" con la URL correcta de tu pantalla */}
        {/* 3. Puedes poner un botón o cualquier elemento dentro del Link */}
        <button style={{ /* Estilos básicos opcionales */
            padding: '10px 15px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '20px'
         }}>
          Ir a Gestión de Usuarios
        </button>
      </Link>

      {/* ... Más contenido ... */}
    </main>
  );
}